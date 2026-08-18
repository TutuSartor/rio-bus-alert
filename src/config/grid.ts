/**
 * Sistema de Grade Espacial (Spatial Grid System) do Projeto Rio Bus Alert
 *
 * Todas as dimensões e espaçamentos do aplicativo derivam desta grade.
 * Baseado nos princípios de Design System do Kole Jain e no layout do Transit App.
 *
 * Regra: Qualquer medida de padding, margin, largura de coluna ou altura de componente
 * deve ser um múltiplo de GRID_UNIT (4px) para garantir alinhamento perfeito.
 */

/** Unidade base da grade. Todos os valores são múltiplos deste número. */
export const GRID_UNIT = 4;

/** Atalhos para múltiplos comuns da grade. */
export const SPACING = {
  xs: GRID_UNIT,           // 4px
  sm: GRID_UNIT * 2,       // 8px
  md: GRID_UNIT * 3,       // 12px
  base: GRID_UNIT * 4,     // 16px  (padding padrão horizontal)
  lg: GRID_UNIT * 5,       // 20px  (padding interno dos banners)
  xl: GRID_UNIT * 6,       // 24px
  xxl: GRID_UNIT * 8,      // 32px
} as const;

/** Larguras fixas de colunas para alinhamento vertical rigoroso. */
export const COLUMNS = {
  /** Margem horizontal global do app (esquerda e direita). */
  gutter: SPACING.base,    // 16px

  /** Largura fixa da coluna do ETA (números de minutos + arcos). */
  etaColumn: GRID_UNIT * 22, // 88px

  /** Largura mínima do badge do número da linha dentro do banner. */
  lineNumberMinWidth: GRID_UNIT * 20, // 80px
} as const;

/** Alturas fixas de componentes para ritmo vertical consistente. */
export const HEIGHTS = {
  /** Cada banner de linha de ônibus ocupa exatamente esta altura. */
  transitBanner: GRID_UNIT * 26, // 104px

  /** Altura da barra de pesquisa em cápsula. */
  searchCapsule: GRID_UNIT * 12, // 48px

  /** Altura da zona de toque da alça de arrasto (drag handle). */
  dragHandle: GRID_UNIT * 8,     // 32px
} as const;

/** Raios de borda padronizados. */
export const RADII = {
  pill: GRID_UNIT * 6,     // 24px (cápsulas, search bar)
  card: GRID_UNIT * 4,     // 16px (cartões de ação)
  sheet: GRID_UNIT * 7,    // 28px (borda do bottom sheet)
  badge: GRID_UNIT * 2.5,  // 10px (badges de linha)
} as const;
