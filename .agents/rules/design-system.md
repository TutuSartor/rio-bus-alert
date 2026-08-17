# Diretrizes de Design System e UX (Inspiração: Kole Jain + Transit App)

Este documento define as regras visuais e de experiência do usuário para o desenvolvimento das telas e componentes do aplicativo.

---

## 🎨 1. Filosofia Visual (Kole Jain Aesthetic)

### Paleta de Cores e Modos
* **Fundo Principal (Dark Background):** `#0F172A` (Slate 900) ou `#090D16` (Deep Dark).
* **Superfícies de Cartões (Card Surface):** `#1E293B` (Slate 800) com bordas sutis translúcidas (`rgba(255, 255, 255, 0.08)`).
* **Cor de Ação / Destaque Primário:** `#3B82F6` (Electric Blue) ou `#10B981` (Emerald Green).
* **Alerta de Proximidade (Geofence Alert):** `#F59E0B` (Amber) ou `#EF4444` (Vibrant Coral).
* **Texto Primário:** `#F8FAFC` (High Contrast White).
* **Texto Secundário / Metadados:** `#94A3B8` (Muted Slate).

### Tipografia e Hierarquia
* **Pesos de Fonte:** Inter ou Roboto (Bold para identificadores de linha, Medium para horários, Regular para detalhes).
* **Badges / Chips:** Identificadores de linhas de ônibus com cantos arredondados (`border-radius: 8px`), contraste elevado e fundo colorido por operadora.

---

## ⚡ 2. Microanimações e Interatividade

* **Painel Deslizante (Bottom Sheet):** Deslocamento fluido com física de mola (spring animations) usando `@gorhom/bottom-sheet`.
* **Gestos (Swipe Actions):** Suporte a gestos laterais para salvar linhas favoritas ou descartar alertas.
* **Feedback Tátil (Haptics):** Vibração discreta ao selecionar um ponto de ônibus ou ativar o alerta de proximidade.

---

## 📱 3. Estrutura de Telas (Transit-Style Layout)

1. **Camada Inferior:** Mapa interativo em tela cheia (estilo escuro ou alto contraste).
2. **Camada Superior (Overlay):** Painel deslizante com barra de busca rápida e cartões de linhas disponíveis.
3. **Cartão de Alerta Ativo:** Notificação flutuante com progresso em metros até o ponto de desembarque.
