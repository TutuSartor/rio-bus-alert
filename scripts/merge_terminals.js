const fs = require('fs');
const path = require('path');

const stopsPath = path.join(__dirname, '../data/processed/rio_bus_stops.json');
const stops = JSON.parse(fs.readFileSync(stopsPath, 'utf8'));

function haversine(c1, c2) {
  const toRad = v => (v * Math.PI) / 180;
  const dLat = toRad(c2.latitude - c1.latitude);
  const dLon = toRad(c2.longitude - c1.longitude);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(c1.latitude)) * Math.cos(toRad(c2.latitude)) * Math.sin(dLon/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

const processed = [];
const visited = new Set();

for (let i = 0; i < stops.length; i++) {
  if (visited.has(stops[i].id)) continue;
  
  const group = [stops[i]];
  visited.add(stops[i].id);
  
  const isTerminalKeyword = /terminal|plataforma|estação|estacao|baia|ponto final/i.test(stops[i].name);

  for (let j = i + 1; j < stops.length; j++) {
    if (visited.has(stops[j].id)) continue;
    
    const d = haversine(stops[i], stops[j]);
    const jIsTerminal = /terminal|plataforma|estação|estacao|baia|ponto final/i.test(stops[j].name);
    
    // Merge conditions:
    // 1. Both are terminal/platform/station and within 65m
    // 2. Or distance is within 25m and share significant naming/location
    if (isTerminalKeyword && jIsTerminal && d <= 65) {
      group.push(stops[j]);
      visited.add(stops[j].id);
    } else if (d <= 20 && (stops[i].name === stops[j].name || stops[i].name.includes(stops[j].name) || stops[j].name.includes(stops[i].name))) {
      group.push(stops[j]);
      visited.add(stops[j].id);
    }
  }
  
  if (group.length > 1) {
    const allLines = Array.from(new Set(group.flatMap(s => s.lines || []))).sort();
    const avgLat = group.reduce((acc, s) => acc + s.latitude, 0) / group.length;
    const avgLon = group.reduce((acc, s) => acc + s.longitude, 0) / group.length;
    
    let cleanName = group[0].name.split('::')[0].split(' - Plataforma')[0].trim();
    if (cleanName.includes('Terminal Aroldo Melodia') || cleanName.includes('Terminal Aroldo')) {
      cleanName = 'Terminal Aroldo Melodia (Fundão)';
    } else if (cleanName.includes('Terminal Alvorada')) {
      cleanName = 'Terminal Alvorada';
    } else if (cleanName.includes('Terminal Gentileza')) {
      cleanName = 'Terminal Gentileza';
    } else if (cleanName.includes('Terminal Jardim Oceânico')) {
      cleanName = 'Terminal Jardim Oceânico';
    } else if (cleanName.includes('Terminal Deodoro')) {
      cleanName = 'Terminal Deodoro';
    } else if (cleanName.includes('Terminal Recreio')) {
      cleanName = 'Terminal Recreio';
    } else if (cleanName.includes('Terminal Sulacap')) {
      cleanName = 'Terminal Sulacap';
    } else if (cleanName.includes('Terminal Madureira')) {
      cleanName = 'Terminal Madureira';
    }
    
    processed.push({
      id: group[0].id,
      name: cleanName,
      latitude: Number(avgLat.toFixed(6)),
      longitude: Number(avgLon.toFixed(6)),
      lines: allLines,
      heading: group[0].heading,
      isTerminal: isTerminalKeyword || group.length >= 3,
      platformCount: group.length,
      subStops: group.map(g => ({ id: g.id, name: g.name, lines: g.lines }))
    });
  } else {
    processed.push(stops[i]);
  }
}

fs.writeFileSync(stopsPath, JSON.stringify(processed, null, 2), 'utf8');
console.log(`Successfully merged ${stops.length} stops into ${processed.length} clean unified stops!`);
