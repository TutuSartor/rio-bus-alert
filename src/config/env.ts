/**
 * Configuração de Variáveis de Ambiente e Sinalização de Visibilidade de IP
 * 
 * 🌐 PÚBLICO: Código da interface e comunicação do cliente
 * 🔒 PRIVADO: Endpoints de microserviços e chaves de produção
 */

export const ENV = {
  // Configuração da Nuvem (Supabase)
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://placeholder-dev-rio-bus.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'dev_local_anon_key_secret_123456',

  // Endpoint do Motor Privado de Estatística e Dados
  PRIVATE_ENGINE_URL: process.env.PRIVATE_ENGINE_API_URL || 'http://localhost:3000',

  // Configurações do App
  DEFAULT_GEOFENCE_RADIUS_METERS: 300,
  APP_VERSION: '1.0.0',
};
