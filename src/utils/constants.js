/** Constantes globais do sistema */

export const APP_NAME = 'Grand Mercure Curitiba Rayon';
export const APP_VERSION = '1.0.0';
export const SYSTEM_SECTOR = 'Governança / Stewarding';

export const STORAGE_KEYS = {
  SESSION: 'gm_session',
  INVENTORY: 'gm_inventory',
  INVENTORY_VERSION: 'gm_inventory_version',
  UNIT: 'gm_selected_unit',
};

/** Incrementar ao alterar a lista padrão de itens */
export const INVENTORY_DATA_VERSION = '2';

export const CATEGORIES = [
  'Todos',
  'Pratos',
  'Talheres',
  'Copos e Taças',
  'Xícaras',
  'Bandejas',
  'Outros',
];

export const UNITS = [
  { id: 'rayon', nome: 'Grand Mercure Curitiba Rayon' },
  { id: 'centro', nome: 'Unidade Centro' },
  { id: 'aeroporto', nome: 'Unidade Aeroporto' },
  { id: 'batel', nome: 'Unidade Batel' },
];

export const STATUS = {
  DISPONIVEL: 'Disponível',
  ATENCAO: 'Atenção',
  BAIXO: 'Baixo Estoque',
};

/** Limite percentual para alertas de estoque */
export const STOCK_THRESHOLDS = {
  BAIXO: 0.25,
  ATENCAO: 0.45,
};

export const CHART_COLORS = [
  '#1b2a4a',
  '#c9a962',
  '#2a3f6b',
  '#6b7280',
  '#e8d5a3',
  '#374151',
  '#9ca3af',
];
