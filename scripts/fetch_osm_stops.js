const https = require('https');
const fs = require('fs');
const path = require('path');

// Bounding box da Ilha do Governador
const query = `[out:json][timeout:25];(node["highway"="bus_stop"](-22.84,-43.25,-22.78,-43.16);node["public_transport"="platform"](-22.84,-43.25,-22.78,-43.16););out body;`;
const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

console.log('Consultando OpenStreetMap Overpass para paradas reais na Ilha do Governador...');

https.get(url, { headers: { 'User-Agent': 'RioBusAlert/1.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Total de paradas encontradas na Ilha:', json.elements ? json.elements.length : 0);
      if (json.elements && json.elements.length > 0) {
        const stops = json.elements.map((el, i) => ({
          id: 'STOP_OSM_' + (el.id || i),
          name: el.tags && (el.tags.name || el.tags.description || el.tags.shelter_name) 
                ? (el.tags.name || el.tags.description)
                : `Ponto de Ônibus #${el.tags && el.tags.ref ? el.tags.ref : (i + 1)}`,
          latitude: el.lat,
          longitude: el.lon,
          neighborhood: 'Ilha do Governador'
        }));
        
        // Garante que o ponto da esquina da Rua Serenata está nomeado perfeitamente
        stops.unshift({
          id: 'STOP_SERENATA_01',
          name: 'Estrada do Galeão (Esquina com Rua Serenata, 193)',
          latitude: -22.8122,
          longitude: -43.2048,
          neighborhood: 'Jardim Guanabara'
        });

        const destPath = path.join(__dirname, '../data/processed/rio_bus_stops.json');
        fs.writeFileSync(destPath, JSON.stringify(stops, null, 2));
        console.log(`✅ Salvos ${stops.length} pontos reais em ${destPath}!`);
      }
    } catch(e) {
      console.error('Erro no parse:', e.message);
    }
  });
}).on('error', (e) => console.error('Erro na requisição:', e.message));
