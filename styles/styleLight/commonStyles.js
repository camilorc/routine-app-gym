import { colors } from './colors';

// Estilos de texto
export const textStyles = {
  // Títulos
  h1: 'text-3xl font-bold text-gray-900',
  h2: 'text-2xl font-bold text-gray-900',
  h3: 'text-xl font-semibold text-gray-900',
  h4: 'text-lg font-semibold text-gray-900',
  
  // Cuerpo
  body: 'text-base text-gray-900',
  bodySecondary: 'text-base text-gray-600',
  bodySmall: 'text-sm text-gray-900',
  bodySmallSecondary: 'text-sm text-gray-600',
  
  // Labels
  label: 'text-sm text-gray-600 font-medium',
  labelBold: 'text-sm text-gray-900 font-semibold',
  
  // Especiales
  caption: 'text-xs text-gray-500',
  link: 'text-base text-[#10A37F] underline',
  error: 'text-sm text-red-600',
};

// Estilos de botones
export const buttonStyles = {
  // Botón primario (verde brillante - más visible)
  primary: {
    container: 'bg-[#059669] rounded-xl p-4',
    text: 'text-white font-semibold text-center text-base',
  },
  
  // Botón secundario (verde más suave)
  secondary: {
    container: 'bg-[#10A37F] rounded-xl p-4',
    text: 'text-white font-semibold text-center text-base',
  },
  
  // Botón outline
  outline: {
    container: 'border-2 border-[#10A37F] rounded-xl p-4',
    text: 'text-[#10A37F] font-semibold text-center text-base',
  },
  
  // Botón de error/peligro
  danger: {
    container: 'bg-red-600 rounded-xl p-4',
    text: 'text-white font-semibold text-center text-base',
  },
  
  // Botón deshabilitado
  disabled: {
    container: 'bg-gray-300 rounded-xl p-4 opacity-50',
    text: 'text-gray-500 font-semibold text-center text-base',
  },
  
  // Botón con icono
  withIcon: 'flex-row items-center justify-center',
  iconSpacing: 'ml-2',
};

// Estilos de inputs
export const inputStyles = {
  // Input base
  base: {
    container: 'mb-4',
    label: 'text-sm text-gray-600 mb-2 font-medium',
    input: 'bg-white text-gray-900 rounded-xl px-4 py-4 text-base border border-gray-200',
    inputFocused: 'border border-[#10A37F]',
    error: 'text-sm text-red-600 mt-1',
  },
  
  // TextArea
  textarea: {
    container: 'mb-4',
    label: 'text-sm text-gray-600 mb-2 font-medium',
    input: 'bg-white text-gray-900 rounded-xl px-4 py-4 text-base h-32 border border-gray-200',
  },
  
  // Input de búsqueda
  search: {
    container: 'bg-white rounded-xl px-4 py-3 flex-row items-center border border-gray-200',
    input: 'flex-1 text-gray-900 ml-3 text-base',
  },
  
  // Input pequeño (para tablas)
  small: {
    input: 'bg-gray-100 text-gray-900 text-center rounded-lg py-2 w-full text-base border border-gray-200',
  },
};

// Estilos de contenedores
export const containerStyles = {
  // Pantalla completa (sin color de fondo - se aplica con style)
  screen: 'flex-1',
  
  // Contenedor con padding
  content: 'flex-1 px-6 py-8',
  contentNoPadding: 'flex-1',
  
  // Cards
  card: 'bg-white rounded-xl p-6 shadow-sm border border-gray-200',
  cardSmall: 'bg-white rounded-xl p-4 shadow-sm border border-gray-200',
  cardNoPadding: 'bg-white rounded-xl shadow-sm border border-gray-200',
  
  // Secciones
  section: 'mb-6',
  sectionSmall: 'mb-4',
  
  // Headers
  header: 'flex-row items-center px-6 py-4 border-b border-gray-200 bg-white',
};

// Estilos de bordes
export const borderStyles = {
  // Bordes sólidos
  solid: 'border border-gray-300',
  solidThick: 'border-2 border-gray-300',
  
  // Bordes punteados
  dashed: 'border-2 border-dashed border-gray-300',
  dashedAccent: 'border-2 border-dashed border-[#10A37F]',
  
  // Bordes redondeados
  rounded: 'rounded-xl',
  roundedSmall: 'rounded-lg',
  roundedFull: 'rounded-full',
};

// Estilos de espaciado
export const spacingStyles = {
  // Márgenes
  marginTop: {
    xs: 'mt-2',
    sm: 'mt-4',
    md: 'mt-6',
    lg: 'mt-8',
  },
  marginBottom: {
    xs: 'mb-2',
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
  },
  
  // Padding
  padding: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
};

// Estilos de iconos
export const iconStyles = {
  sizes: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
  colors: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    accent: colors.accent.primary,
    error: colors.error,
    success: colors.success,
  },
};

// Estilos de badges/etiquetas
export const badgeStyles = {
  success: 'bg-green-100 rounded-full px-3 py-1 border border-green-300',
  error: 'bg-red-100 rounded-full px-3 py-1 border border-red-300',
  warning: 'bg-yellow-100 rounded-full px-3 py-1 border border-yellow-300',
  info: 'bg-blue-100 rounded-full px-3 py-1 border border-blue-300',
  neutral: 'bg-gray-100 rounded-full px-3 py-1 border border-gray-300',
};

// Estilos de tabs
export const tabStyles = {
  container: {
    backgroundColor: colors.background.secondary,
    borderTopColor: colors.border.primary,
    borderTopWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  colors: {
    active: '#059669',  // Verde brillante para tab activo (más visible)
    inactive: colors.text.secondary,
  },
};

// Utilidad para combinar clases
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).join(' ');
};
