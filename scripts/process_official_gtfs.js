/**
 * Processador do GTFS Oficial da SMTR / Prefeitura do Rio de Janeiro
 * 
 * 1. Extrai todos os 7.722 pontos oficiais com coordenadas GPS exatas.
 * 2. Extrai os shapes (traçados metro a metro no asfalto) das linhas reais.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function processGTFS() {
  console.log('==================================================');
  console.log('PROCESSANDO GTFS OFICIAL DA PREFEITURA DO RIO');
  console.log('==================================================\n');

  const stopsPath = path.join(__dirname, '../data/gtfs/stops.txt');
  const routesPath = path.join(__dirname, '../data/gtfs/routes.txt');
  const tripsPath = path.join(__dirname, '../data/gtfs/trips.txt');
  const shapesPath = path.join(__dirname, '../data/gtfs/shapes.txt');

  // 1. Processar Stops Oficiais
  console.log('1. Lendo stops.txt oficial...');
  const stopsRl = readline.createInterface({
    input: fs.createReadStream(stopsPath),
    crlfDelay: Infinity,
  });

  const allStops = [];
  let isHeader = true;

  for await (const line of stopsRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.split(',');
    if (parts.length >= 6) {
      const stopId = parts[0];
      const stopCode = parts[1];
      const stopName = parts[2].replace(/"/g, '');
      const stopLat = parseFloat(parts[4]);
      const stopLon = parseFloat(parts[5]);

      if (!isNaN(stopLat) && !isNaN(stopLon)) {
        allStops.push({
          id: stopId,
          code: stopCode,
          name: stopName,
          latitude: stopLat,
          longitude: stopLon,
          neighborhood: 'Rio de Janeiro',
        });
      }
    }
  }

  console.log(`✅ Total de paradas oficiais carregadas: ${allStops.length}`);
  fs.writeFileSync(
    path.join(__dirname, '../data/processed/rio_bus_stops.json'),
    JSON.stringify(allStops, null, 2)
  );

  // 2. Mapear Linhas e Shapes
  console.log('\n2. Lendo routes.txt e trips.txt...');
  const routesRl = readline.createInterface({
    input: fs.createReadStream(routesPath),
    crlfDelay: Infinity,
  });

  const routesMap = {}; // route_id -> route_short_name
  isHeader = true;
  for await (const line of routesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.split(',');
    if (parts.length >= 4) {
      const routeId = parts[0];
      const shortName = parts[2].replace(/"/g, '');
      const longName = parts[3].replace(/"/g, '');
      routesMap[routeId] = { shortName, longName };
    }
  }

  // Mapear trip -> shape_id
  const tripsRl = readline.createInterface({
    input: fs.createReadStream(tripsPath),
    crlfDelay: Infinity,
  });

  const routeToShape = {}; // shortName -> shape_id
  isHeader = true;
  for await (const line of tripsRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const cleanLine = line.replace(/\r/g, '');
    const parts = cleanLine.split(',');
    if (parts.length >= 7) {
      const routeId = parts[1];
      const shapeId = parts[6];
      const routeInfo = routesMap[routeId];
      if (routeInfo && shapeId && !routeToShape[routeInfo.shortName]) {
        routeToShape[routeInfo.shortName] = shapeId;
      }
    }
  }

  console.log('Linhas mapeadas com shapes oficiais:', Object.keys(routeToShape).length);

  // 3. Processar shapes.txt para as linhas principais
  console.log('\n3. Processando shapes.txt com geometria curva a curva...');
  const targetShapes = new Set(Object.values(routeToShape));
  const shapesRl = readline.createInterface({
    input: fs.createReadStream(shapesPath),
    crlfDelay: Infinity,
  });

  const shapesCoords = {}; // shape_id -> [{latitude, longitude, seq}]
  isHeader = true;
  for await (const line of shapesRl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const parts = line.split(',');
    if (parts.length >= 4) {
      const shapeId = parts[0];
      if (targetShapes.has(shapeId)) {
        if (!shapesCoords[shapeId]) shapesCoords[shapeId] = [];
        shapesCoords[shapeId].push({
          latitude: parseFloat(parts[2]),
          longitude: parseFloat(parts[3]),
          seq: parseInt(parts[1], 10),
        });
      }
    }
  }

  // Ordenar sequências
  for (const sId in shapesCoords) {
    shapesCoords[sId].sort((a, b) => a.seq - b.seq);
  }

  // Gerar o routeGeometry.ts com as coordenadas oficiais curva a curva
  const targetLines = ['324', '323', '634', '910', '474', '483', '309', '457', '606'];
  const finalGeometry = {};

  const lineColors = {
    '324': '#0284C7',
    '323': '#059669',
    '634': '#DC2626',
    '910': '#EAB308',
    '474': '#7C3AED',
    '483': '#EF4444',
    '309': '#F59E0B',
    '457': '#8B5CF6',
    '606': '#10B981',
  };

  for (const lineNum of targetLines) {
    const shapeId = routeToShape[lineNum];
    const coords = (shapeId && shapesCoords[shapeId]) || [];

    if (coords.length > 0) {
      finalGeometry[lineNum] = {
        lineNumber: lineNum,
        name: `Linha ${lineNum}`,
        color: lineColors[lineNum] || '#0284C7',
        coordinates: coords.map(c => ({ latitude: c.latitude, longitude: c.longitude })),
      };
      console.log(`✅ Linha ${lineNum}: ${coords.length} pontos de asfalto extraídos do GTFS oficial.`);
    }
  }

  const geometryFileContent = `/**
 * Traçados Oficiais do GTFS da SMTR / Prefeitura do Rio de Janeiro
 * Coordenadas metro a metro no asfalto (shapes.txt oficial).
 */

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface RouteGeometry {
  lineNumber: string;
  name: string;
  color: string;
  coordinates: LatLng[];
}

export const RIO_BUS_ROUTES_GEOMETRY: Record<string, RouteGeometry> = ${JSON.stringify(finalGeometry, null, 2)};
`;

  fs.writeFileSync(
    path.join(__dirname, '../src/domain/routeGeometry.ts'),
    geometryFileContent
  );

  console.log('\n==================================================');
  console.log('✅ BASE GTFS OFICIAL PROCESSADA E SALVA COM SUCESSO!');
  console.log('==================================================');
}

processGTFS().catch(console.error);
