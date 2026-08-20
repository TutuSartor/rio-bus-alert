-- ================================================================
-- TABELA DE FEEDBACK DA COMUNIDADE & REPORTES DE ERRO (SUPABASE)
-- ================================================================

CREATE TABLE IF NOT EXISTS public.feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(50) NOT NULL, -- 'ponto_erro', 'sugestao', 'linha_problema', 'outro'
    stop_id VARCHAR(100),
    stop_nome VARCHAR(255),
    linha_numero VARCHAR(50),
    descricao TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    resolvido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Política de Inserção Pública (Passageiros podem enviar feedbacks)
CREATE POLICY "Permitir insercao anonima de feedbacks"
ON public.feedbacks
FOR INSERT
TO anon
WITH CHECK (true);

-- Política de Leitura Apenas para Administradores
CREATE POLICY "Permitir leitura apenas para autenticados"
ON public.feedbacks
FOR SELECT
TO authenticated
USING (true);

COMMENT ON TABLE public.feedbacks IS 'Tabela de coleta de feedbacks, reportes de paradas e sugestões dos passageiros do OnBus Rio';
