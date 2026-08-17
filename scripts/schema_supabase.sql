-- ============================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS RELACIONAL ESPACIAL
-- PROJETO: OnBus Rio
-- PLATAFORMA: Supabase (PostgreSQL 15+ com extensão PostGIS)
-- ============================================================

-- 1. Habilitar a extensão espacial PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Tabela de Consórcios e Empresas de Ônibus do Rio de Janeiro
CREATE TABLE IF NOT EXISTS public.consorcios (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    letra_identificadora CHAR(1),
    regiao VARCHAR(100),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Tabela de Linhas de Ônibus
CREATE TABLE IF NOT EXISTS public.linhas (
    id VARCHAR(50) PRIMARY KEY,
    consorcio_id VARCHAR(50) REFERENCES public.consorcios(id),
    numero VARCHAR(20) NOT NULL,
    nome_longo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    cor_hex VARCHAR(10) DEFAULT '#3B82F6',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Tabela de Pontos de Ônibus (com suporte a Geometria Espacial PostGIS)
CREATE TABLE IF NOT EXISTS public.pontos (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    bairro VARCHAR(100),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    localizacao GEOMETRY(Point, 4326),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Criar índice espacial PostGIS para buscas geográficas ultrarrápidas
CREATE INDEX IF NOT EXISTS idx_pontos_localizacao ON public.pontos USING GIST(localizacao);

-- 5. Tabela de Itinerários (Associação e Sequência dos Pontos por Linha)
CREATE TABLE IF NOT EXISTS public.itinerarios_pontos (
    linha_id VARCHAR(50) REFERENCES public.linhas(id) ON DELETE CASCADE,
    ponto_id VARCHAR(50) REFERENCES public.pontos(id) ON DELETE CASCADE,
    sequencia INTEGER NOT NULL,
    PRIMARY KEY (linha_id, ponto_id, sequencia)
);

-- 6. Tabela de Inteligência de Negócio: Matriz Origem-Destino (O-D Analytics Anonimizada)
CREATE TABLE IF NOT EXISTS public.matriz_origem_destino (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ponto_origem_id VARCHAR(50) REFERENCES public.pontos(id),
    ponto_destino_id VARCHAR(50) REFERENCES public.pontos(id),
    linha_selecionada_id VARCHAR(50) REFERENCES public.linhas(id),
    hora_do_dia INTEGER NOT NULL,
    dia_da_semana INTEGER NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Inserir dados iniciais dos Consórcios do Rio de Janeiro
INSERT INTO public.consorcios (id, nome, letra_identificadora, regiao) VALUES
    ('INTERSUL', 'Consórcio Intersul', 'A', 'Zona Sul e Centro'),
    ('INTERNORTE', 'Consórcio Internorte', 'B', 'Zona Norte e Subúrbio'),
    ('TRANSCARIOCA', 'Consórcio Transcarioca', 'C', 'Barra da Tijuca e Jacarepaguá'),
    ('SANTACRUZ', 'Consórcio Santa Cruz', 'D', 'Zona Oeste (Bangu, Campo Grande, Santa Cruz)'),
    ('MOBI_RIO', 'MOBI-Rio (BRT)', 'E', 'Corredores BRT Expressos')
ON CONFLICT (id) DO NOTHING;
