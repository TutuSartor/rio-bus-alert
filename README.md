# Rio Bus Alert

Sistema de Mobilidade Urbana, Notificação em Segundo Plano e Inteligência de Dados Espaciais para o Rio de Janeiro.

---

## Visão Geral do Projeto

Este projeto é uma plataforma de mobilidade urbana desenvolvida sob os princípios de Clean Architecture, Engenharia de Dados (GTFS + Data.rio) e Modelagem Estatística Preditiva.

O objetivo principal é solucionar a necessidade de navegação e notificação em transporte público através de uma interface direta e desacoplada de ruídos visuais ou complexidades desnecessárias.

---

## Recursos Principais

1. **Seleção Direta de Linhas (Ponto A para Ponto B):** Filtragem determinística de linhas de ônibus que conectam diretamente a origem ao destino selecionado pelo usuário.
2. **Localização em Tempo Real:** Mapeamento dinâmico da frota de ônibus municipais utilizando a API de telemetria pública da prefeitura do Rio de Janeiro.
3. **Alerta de Desembarque em Segundo Plano (Geofencing):** Serviço contínuo de monitoramento de coordenadas em segundo plano que notifica o usuário via áudio e vibração ao atingir o raio de proximidade do ponto final.
4. **Cálculo de ETA Probabilístico:** Estimativa do tempo de chegada com intervalo de confiança estatístico baseado na velocidade operacional da frota.

---

## Arquitetura do Sistema

```
rio-bus-alert/
├── assets/                  # Arquivos de mídia, sons e ícones do sistema
├── src/
│   ├── config/              # Variáveis de ambiente e constantes do sistema
│   ├── domain/              # Lógica de negócio, geometria espacial e algoritmos de ETA
│   ├── services/            # Clientes de comunicação com a API Data.rio e banco de dados
│   ├── components/          # Componentes de interface do React Native
│   ├── screens/             # Visões principais da aplicação
│   └── navigation/          # Controle de rotas e fluxo de telas
├── scripts/                 # Pipelines de ETL para processamento de dados GTFS
└── app.json                 # Configurações de permissões de sistema do Expo
```

---

## Modelo de Propriedade Intelectual e Segurança

A estrutura do projeto adota o padrão de repositório público com pipeline privado:

* **Cliente Mobile (Repositório Público):** O código da aplicação cliente permanece visível para auditoria técnica e avaliação de portfólio sob a licença GNU General Public License v3.0 (GPL-3.0).
* **Processamento de Dados e Backend (Ambiente Privado):** Os módulos de agregação espacial PostGIS, pipelines de ETL e credenciais de produção permanecem isolados em infraestrutura de nuvem.

---

## Instalação e Execução

### Pré-requisitos
* Node.js (versão 18 ou superior)
* Gerenciador de pacotes npm ou yarn

### Instruções

1. Instalar as dependências do projeto:
```bash
npm install
```

2. Executar a verificação de conectividade com a API de telemetria:
```bash
node scripts/test_datario_api.js
```

3. Iniciar o servidor de desenvolvimento do Expo:
```bash
npm start
```

---

## Tecnologias e Bibliotecas

* **Frontend Mobile:** React Native, Expo, TypeScript, React Native Maps, Expo Location, Expo Notifications.
* **Banco de Dados Relacional Espacial:** PostgreSQL 15+ com extensão PostGIS.
* **Fontes de Dados:** GTFS Estático (Data.rio / SMTR-RJ) e API REST de telemetria em tempo real.
