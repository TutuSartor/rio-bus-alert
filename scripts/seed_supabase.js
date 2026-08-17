/**
 * Script de Carga Automática de Dados (Seeding) para o Supabase
 * PROJETO: rio-bus-alert
 * 
 * Execução: node scripts/seed_supabase.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Leitura nativa do arquivo .env
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    envVars[match[1]] = value.trim();
  }
});

const SUPABASE_URL = envVars.SUPABASE_URL;
const SUPABASE_KEY = envVars.SUPABASE_ANON_KEY;

console.log('====================================================');
console.log('🚌 ONBUS / RIO-BUS-ALERT - Carga de Dados no Supabase');
console.log('====================================================\n');

if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.includes('placeholder')) {
  console.error('❌ Erro: Chaves do Supabase não encontradas no arquivo .env.');
  process.exit(1);
}

const stops = require('../data/processed/rio_bus_stops.json');
const routes = require('../data/processed/rio_bus_routes.json');
const stopRoutes = require('../data/processed/rio_stop_routes.json');

function supabasePost(table, payload) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
    const data = JSON.stringify(payload);

    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

async function seedData() {
  try {
    console.log(`Conectando ao banco na nuvem: ${SUPABASE_URL}\n`);

    // 1. Inserir Linhas de Ônibus
    console.log(`1. Inserindo ${routes.length} linhas de ônibus na tabela 'linhas'...`);
    const routesPayload = routes.map((r) => ({
      id: r.id,
      numero: r.shortName,
      nome_longo: r.longName,
      categoria: r.category || 'Municipal',
      consorcio_id: r.id === '606' ? 'INTERNORTE' : (r.id === '309' ? 'TRANSCARIOCA' : 'INTERSUL'),
    }));
    await supabasePost('linhas', routesPayload);
    console.log('✅ Linhas inseridas com sucesso!');

    // 2. Inserir Pontos de Ônibus (com Geometria PostGIS)
    console.log(`\n2. Inserindo ${stops.length} pontos de ônibus na tabela 'pontos'...`);
    const stopsPayload = stops.map((s) => ({
      id: s.id,
      nome: s.name,
      bairro: s.neighborhood || 'Rio de Janeiro',
      latitude: s.latitude,
      longitude: s.longitude,
      localizacao: `POINT(${s.longitude} ${s.latitude})`,
    }));
    await supabasePost('pontos', stopsPayload);
    console.log('✅ Pontos de ônibus inseridos com sucesso!');

    // 3. Inserir Itinerários (Tabela de Associação)
    console.log(`\n3. Inserindo ${stopRoutes.length} mapeamentos de itinerários...`);
    const itinerariosPayload = stopRoutes.map((sr, idx) => ({
      linha_id: sr.routeId,
      ponto_id: sr.stopId,
      sequencia: idx + 1,
    }));
    await supabasePost('itinerarios_pontos', itinerariosPayload);
    console.log('✅ Itinerários inseridos com sucesso!');

    console.log('\n====================================================');
    console.log('🎉 ETAPA 2 CONCLUÍDA! BANCO DE DADOS NA NUVEM POVOADO!');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Erro durante a carga de dados:', error.message);
  }
}

seedData();
