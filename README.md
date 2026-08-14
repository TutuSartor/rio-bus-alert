# 🚌 Rio Bus Alert (Nome de Desenvolvimento)

> **Aplicativo de Mobilidade Urbana, Notificação em Segundo Plano & Inteligência de Dados Espaciais para o Rio de Janeiro**

Este projeto é uma plataforma completa de mobilidade urbana projetada desde o dia 1 com **Clean Architecture**, **Engenharia de Dados (GTFS + Data.rio)** e **Modelagem Estatística Preditiva**.

---

## 🎯 Proposta de Valor

1. **Seleção Direta (Ponto A ➔ Ponto B):** Filtro instantâneo de quais linhas de ônibus conectam o ponto de origem ao destino final.
2. **Localização em Tempo Real:** Visualização no mapa dos ônibus municipais em trânsito via sinal de GPS dos dados abertos da prefeitura do Rio de Janeiro.
3. **Alerta de Desembarque em Segundo Plano (Geofencing):** Sistema de vigilância por GPS que avisa o usuário (som + vibração) quando ele se aproxima do ponto final desejado, mesmo com a tela do celular bloqueada.
4. **ETA Probabilístico:** Cálculo do tempo de chegada com intervalo de confiança estatístico de 95%, ajustado pela velocidade da frota em tempo real.

---

## 🏗️ Arquitetura do Sistema

```
rio-bus-alert/
├── assets/                  # Sons de alarme, ícones e splash screens
├── src/
│   ├── config/              # Variáveis de ambiente e constantes (.env)
│   ├── domain/              # Lógica de Negócio e Estatística (Fórmula de Haversine, Geofencing, ETA)
│   ├── services/            # Serviços de integração (API Data.rio, Supabase Client)
│   ├── components/          # Componentes de interface do React Native (Mapas, Cards, Banners)
│   ├── screens/             # Telas do aplicativo (Busca, Trajeto, Alerta)
│   └── navigation/          # Roteamento de telas
├── scripts/                 # Pipelines de ETL em Node.js/Python para tratamento dos dados GTFS
└── app.json                 # Configurações do Expo (Permissões de GPS em Background)
```

---

## 🔒 Propriedade Intelectual & Modelo Híbrido

Para fins de portfólio profissional e exibição técnica:
* **Interface & Client Mobile:** Código do aplicativo aberto para auditoria e demonstração de engenharia no GitHub.
* **Pipeline de Dados & Banco Espacial:** Módulos de agregação espacial PostGIS e microsserviços privados de tratamento de dados mantidos em ambiente seguro de nuvem (Supabase + Render/Vercel).

---

## 🚀 Como Executar o Projeto

```bash
# 1. Instalar as dependências
npm install

# 2. Executar o teste do consumo da API de GPS do Rio de Janeiro
npm run datario:test

# 3. Iniciar o projeto no Expo
npm start
```

---

## 📊 Tecnologias Utilizadas

* **Mobile App:** React Native, Expo, TypeScript, `react-native-maps`, `expo-location`, `expo-notifications`.
* **Banco de Dados (Nuvem):** PostgreSQL 15+ com extensão **PostGIS** hospedado no Supabase (AWS São Paulo).
* **Fontes de Dados:** GTFS Estático (Data.rio / SMTR-RJ) + API REST em tempo real da frota de ônibus do Rio de Janeiro.
