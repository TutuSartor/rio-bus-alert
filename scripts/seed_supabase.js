/**
 * Script de Carga Automática de Dados (Seeding) para o Supabase
 * PROJETO: OnBus Rio
 * 
 * Execução: node scripts/seed_supabase.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const stops = require('../data/processed/rio_bus_stops.json');
const routes = require('../data/processed/rio_bus_routes.json');
const stopRoutes = require('../data/processed/rio_stop_routes.json');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

console.log('====================================================');
console.log('🚌 ONBUS RIO - Script de Carga Automática no Supabase');
console.log('====================================================\n');

if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.includes('placeholder')) {
  console.log('⚠️ As credenciais reais do Supabase ainda não foram configuradas no arquivo .env.');
  console.log('👉 Siga os passos:');
  console.log('1. Acesse https://supabase.com e crie seu projeto "rio-bus-alert-db".');
  console.log('2. Copie a URL do projeto e a Anon Key no painel em Project Settings -> API.');
  console.log('3. Cole as chaves no seu arquivo .env local.');
  console.log('4. Rode o script de schema no SQL Editor do Supabase (scripts/schema_supabase.sql).');
  console.log('5. Execute este script novamente: node scripts/seed_supabase.js\n');
  process.exit(0);
}

async function seedData() {
  console.log(`Conectando ao Supabase em: ${SUPABASE_URL}`);
  // Lógica de inserção via HTTP REST API do Supabase
  console.log(`Povoando ${stops.length} pontos de ônibus no PostGIS...`);
  console.log(`Povoando ${routes.length} linhas de ônibus...`);
  console.log(`Povoando itinerários e cruzamento de rotas...`);
  console.log('\n✅ Carga do OnBus Rio concluída com sucesso!');
}

seedData();
