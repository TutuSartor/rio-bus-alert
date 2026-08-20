const fs = require('fs');
const path = require('path');
const readline = require('readline');

function haversine(c1, c2) {
  const toRad = v => (v * Math.PI) / 180;
  const dLat = toRad(c2.lat - c1.lat);
  const dLon = toRad(c2.lon - c1.lon);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(c1.lat)) * Math.cos(toRad(c2.lat)) * Math.sin(dLon/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function calculateBearing(lat1, lon1, lat2, lon2) {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x = Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
            Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  return Math.round(((Math.atan2(y, x) * 180) / Math.PI + 360) % 360);
}

function angleDifference(a1, a2) {
  return Math.abs((a1 - a2 + 180) % 360 - 180);
}

async function rebuild() {
  console.log('1. Carregando dados base...');
  const gtfsDir = path.join(__dirname, '../data/gtfs');
  const stops = {};
  
  const stopsRl = readline.createInterface({ input: fs.createReadStream(path.join(gtfsDir, 'stops.txt')) });
  let isHeader = true;
  for await (const line of stopsRl) {
    if (isHeader) { isHeader = false; continue; }
    const p = line.replace(/\r\n?/g, '').split(',');
    if (p.length < 6) continue;
    const lat = parseFloat(p[4]);
    const lon = parseFloat(p[5]);
    if (!isNaN(lat) && !isNaN(lon)) {
      stops[p[0]] = { id: p[0], code: p[1], name: p[2].replace(/"/g, ''), lat, lon, lines: new Set(), headings: [] };
    }
  }
  
  const trips = {}; 
  const tripsRl = readline.createInterface({ input: fs.createReadStream(path.join(gtfsDir, 'trips.txt')) });
  isHeader = true;
  for await (const line of tripsRl) {
    if (isHeader) { isHeader = false; continue; }
    const p = line.replace(/\r\n?/g, '').split(',');
    if (p.length >= 7) trips[p[0]] = { routeId: p[1], shapeId: p[6] };
  }

  const routesMap = {};
  const routesRl = readline.createInterface({ input: fs.createReadStream(path.join(gtfsDir, 'routes.txt')) });
  isHeader = true;
  for await (const line of routesRl) {
    if (isHeader) { isHeader = false; continue; }
    const p = line.replace(/\r\n?/g, '').split(',');
    if (p.length >= 4) routesMap[p[0]] = p[2].replace(/"/g, '');
  }

  console.log('2. Mapeando shapes...');
  const shapes = {}; 
  const shapesRl = readline.createInterface({ input: fs.createReadStream(path.join(gtfsDir, 'shapes.txt')) });
  isHeader = true;
  for await (const line of shapesRl) {
    if (isHeader) { isHeader = false; continue; }
    const p = line.replace(/\r\n?/g, '').split(',');
    if (p.length >= 5) {
      const sId = p[0];
      if (!shapes[sId]) shapes[sId] = [];
      shapes[sId].push({ lat: parseFloat(p[2]), lon: parseFloat(p[3]), dist: parseFloat(p[4]) });
    }
  }

  console.log('3. Lendo stop_times e calculando azimutes (aguarde, são 8M linhas)...');
  const stopTimesRl = readline.createInterface({ input: fs.createReadStream(path.join(gtfsDir, 'stop_times.txt')) });
  isHeader = true;
  let count = 0;
  for await (const line of stopTimesRl) {
    if (isHeader) { isHeader = false; continue; }
    count++;
    if (count % 1000000 === 0) console.log(count + ' stop_times lidos...');
    const p = line.replace(/\r\n?/g, '').split(',');
    if (p.length < 7) continue;
    const tripId = p[0];
    const stopId = p[2];
    const shapeDist = parseFloat(p[6]);
    
    const stop = stops[stopId];
    const trip = trips[tripId];
    if (stop && trip) {
      stop.lines.add(routesMap[trip.routeId]);
      
      if (!isNaN(shapeDist) && shapes[trip.shapeId]) {
        const pts = shapes[trip.shapeId];
        let minD = Infinity;
        let bestIdx = -1;
        for (let i = 0; i < pts.length - 1; i++) {
          const diff = Math.abs(pts[i].dist - shapeDist);
          if (diff < minD) { minD = diff; bestIdx = i; }
        }
        if (bestIdx !== -1) {
          const p1 = pts[bestIdx];
          const p2 = pts[bestIdx + 1];
          if (p1 && p2) stop.headings.push(calculateBearing(p1.lat, p1.lon, p2.lat, p2.lon));
        }
      }
    }
  }

  console.log('4. Clustering...');
  const rawStops = Object.values(stops).map(s => {
    let finalHeading = 45;
    if (s.headings.length > 0) {
      let sinSum = 0, cosSum = 0;
      s.headings.forEach(a => {
        const rad = (a * Math.PI) / 180;
        sinSum += Math.sin(rad);
        cosSum += Math.cos(rad);
      });
      const avgRad = Math.atan2(sinSum / s.headings.length, cosSum / s.headings.length);
      finalHeading = Math.round(((avgRad * 180) / Math.PI + 360) % 360);
    }
    return { ...s, heading: finalHeading, lines: Array.from(s.lines).sort() };
  }).filter(s => s.lines.length > 0);

  function getPlatform(name) {
    const match = name.match(/plataforma\s*([a-z0-9]+)/i);
    return match ? match[1].toUpperCase() : null;
  }

  const clusteredStops = [];
  const visited = new Set();
  for (let i = 0; i < rawStops.length; i++) {
    if (visited.has(rawStops[i].id)) continue;
    const current = rawStops[i];
    const group = [current];
    visited.add(current.id);
    const isTerminal = /terminal|plataforma|esta/i.test(current.name);
    const maxRadius = isTerminal ? 50 : 20;
    const currentPlatform = getPlatform(current.name);

    for (let j = i + 1; j < rawStops.length; j++) {
      if (visited.has(rawStops[j].id)) continue;
      const other = rawStops[j];
      
      if (haversine(current, other) <= maxRadius && angleDifference(current.heading, other.heading) <= 65) {
        group.push(other);
        visited.add(other.id);
      }
    }
    
    const allLines = Array.from(new Set(group.flatMap(s => s.lines))).sort();
    const avgLat = group.reduce((a, s) => a + s.lat, 0) / group.length;
    const avgLon = group.reduce((a, s) => a + s.lon, 0) / group.length;
    
    // Se agrupou uma plataforma específica, manter o nome dela
    let baseName = current.name;
    if (!currentPlatform && isTerminal) {
       baseName = group[0].name.split(' - Plataforma')[0].trim();
    }
    
    clusteredStops.push({
      id: group.map(s => s.id).join('|'),
      name: baseName,
      latitude: avgLat,
      longitude: avgLon,
      neighborhood: 'Rio de Janeiro',
      lines: allLines,
      heading: group[0].heading,
      isTerminal: isTerminal,
      subStops: group.map(s => s.id)
    });
  }

  console.log('Total clusters: ' + clusteredStops.length + ' (de ' + rawStops.length + ')');
  fs.writeFileSync(path.join(__dirname, '../data/processed/rio_bus_stops.json'), JSON.stringify(clusteredStops, null, 2));
}
rebuild().catch(console.error);