/**
 * Script para Download e Processamento dos Dados GTFS Estáticos do Rio de Janeiro
 * 
 * Executar via terminal: npm run gtfs:fetch
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// URL do GTFS público do Rio de Janeiro (Prefeitura do Rio / SMTR)
const GTFS_RIO_URL = 'https://www.dados.rio/gtfs/gtfs_sppo.zip';
const OUTPUT_DIR = path.join(__dirname, '../data/gtfs');

console.log('====================================================');
console.log('📄 Preparando download dos arquivos GTFS do Rio...');
console.log('====================================================\n');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Pasta de destino criada: ${OUTPUT_DIR}`);
console.log('Pronto para baixar e extrair routes.txt, stops.txt, stop_times.txt e trips.txt na próxima etapa.');
