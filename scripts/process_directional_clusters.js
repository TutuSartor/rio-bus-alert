const fs = require('fs');
const path = require('path');
const readline = require('readline');

function haversine(c1, c2) {
  const toRad = v => (v * Math.PI) / 180;
  const dLat = toRad(c2.latitude - c1.latitude);
  const dLon = toRad(c2.longitude - c1.longitude);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(c1.latitude)) * Math.cos(toRad(c2.latitude)) * Math.sin(dLon/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Angular difference between two headings (0-180 degrees)
function angleDifference(a1, a2) {
  const diff = Math.abs((a1 - a2 + 180) % 360 - 180);
  return diff;
}

async function runDirectionalGrouping() {
  console.log('=== PROCESSANDO AGRUPAMENTO DIRECIONAL (IDA E VOLTA) ===');

  // 1. Recarregar pontos com linhas e headings de stop_routes
  const stopRoutesPath = path.join(__dirname, '../data/processed/rio_stop_routes.json');
  const stopRoutes = JSON.parse(fs.readFileSync(stopRoutesPath, 'utf8'));
  
  // Mapa de linhas por stop_id
  const linesByStop = {};
  stopRoutes.forEach(sr => {
    const sId = sr.stopId || sr.stop_id;
    const lNum = sr.lineNumber || sr.route_short_name;
    if (sId && lNum) {
      if (!linesByStop[sId]) linesByStop[sId] = new Set();
      linesByStop[sId].add(lNum);
    }
  });

  // Ler stops do GTFS
  const gtfsDir = path.join(__dirname, '../data/gtfs');
  const stopsPath = path.join(gtfsDir, 'stops.txt');
  const stopsRl = readline.createInterface({
    input: fs.createReadStream(stopsPath),
    crlfDelay: Infinity,
  });

  const rawStops = [];
  let isHeader = true;

  for await (const line of stopsRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.replace(/\r/g, '').split(',');
    if (parts.length >= 6) {
      const stopId = parts[0];
      const stopCode = parts[1];
      const stopName = parts[2].replace(/"/g, '');
      const stopLat = parseFloat(parts[4]);
      const stopLon = parseFloat(parts[5]);

      if (!isNaN(stopLat) && !isNaN(stopLon)) {
        rawStops.push({
          id: stopId,
          code: stopCode,
          name: stopName,
          latitude: stopLat,
          longitude: stopLon,
          neighborhood: 'Rio de Janeiro',
          lines: Array.from(linesByStop[stopId] || []).sort(),
        });
      }
    }
  }

  // Atribuir headings conhecidos/calculados
  // Terminais e vias principais
  rawStops.forEach(s => {
    const nameLower = s.name.toLowerCase();
    if (nameLower.includes('sentido ilha') || nameLower.includes('plataforma a') || nameLower.includes('para ilha')) {
      s.heading = 72;
    } else if (nameLower.includes('sentido centro') || nameLower.includes('sentido zona norte') || nameLower.includes('plataforma b') || nameLower.includes('plataforma c') || nameLower.includes('plataforma d')) {
      s.heading = 252;
    } else if (!s.heading) {
      s.heading = 45;
    }
  });

  // 2. Agrupar apenas pontos MUITO PRÓXIMOS que compartilham O MESMO SENTIDO / HEADING
  const processed = [];
  const visited = new Set();

  for (let i = 0; i < rawStops.length; i++) {
    if (visited.has(rawStops[i].id)) continue;

    const current = rawStops[i];
    const group = [current];
    visited.add(current.id);

    const isTerminal = /terminal|plataforma|estação|estacao|baia|ponto final/i.test(current.name);
    const maxRadius = isTerminal ? 50 : 20;

    for (let j = i + 1; j < rawStops.length; j++) {
      if (visited.has(rawStops[j].id)) continue;
      const other = rawStops[j];

      const d = haversine(current, other);
      if (d <= maxRadius) {
        // REGRA DE OURO: Só agrupa se estiver no MESMO sentido (diferença angular < 65°)
        const angleDiff = angleDifference(current.heading, other.heading);
        if (angleDiff <= 65) {
          group.push(other);
          visited.add(other.id);
        }
      }
    }

    if (group.length > 1) {
      const allLines = Array.from(new Set(group.flatMap(s => s.lines || []))).sort();
      const avgLat = group.reduce((acc, s) => acc + s.latitude, 0) / group.length;
      const avgLon = group.reduce((acc, s) => acc + s.longitude, 0) / group.length;

      // Nome limpo preservando o sentido (Ida vs Volta)
      let baseName = group[0].name.split(' - Plataforma')[0].trim();
      if (group[0].heading >= 30 && group[0].heading <= 120 && baseName.includes('Terminal Aroldo Melodia')) {
        baseName = 'Terminal Aroldo Melodia :: Sentido Ilha';
      } else if (group[0].heading >= 200 && group[0].heading <= 300 && baseName.includes('Terminal Aroldo Melodia')) {
        baseName = 'Terminal Aroldo Melodia :: Sentido Centro e Zona Norte';
      }

      processed.push({
        id: group[0].id,
        name: baseName,
        latitude: Number(avgLat.toFixed(6)),
        longitude: Number(avgLon.toFixed(6)),
        lines: allLines,
        heading: group[0].heading,
      });
    } else {
      processed.push(current);
    }
  }

  console.log(`Original: ${rawStops.length} pontos`);
  console.log(`Resultado com Ida e Volta separados: ${processed.length} pontos`);

  const outputPath = path.join(__dirname, '../data/processed/rio_bus_stops.json');
  fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2), 'utf8');
  console.log('✅ Base salva em:', outputPath);
}

runDirectionalGrouping().catch(console.error);
