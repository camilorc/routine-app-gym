import { colors } from './colors';

// Estilos de texto
export const textStyles = {
  // Títulos
  h1: 'text-3xl font-bold text-white',
  h2: 'text-2xl font-bold text-white',
  h3: 'text-xl font-semibold text-white',
  h4: 'text-lg font-semibold text-white',
  
  // Cuerpo
  body: 'text-base text-gray-100',
  bodySecondary: 'text-base text-gray-400',
  bodySmall: 'text-sm text-gray-100',
  bodySmallSecondary: 'text-sm text-gray-400',
  
  // Labels
  label: 'text-sm text-gray-400 font-medium',
  labelBold: 'text-sm text-white font-semibold',
  
  // Especiales
  caption: 'text-xs text-gray-400',
  link: 'text-base text-[#06D6A0] underline',
  error: 'text-sm text-red-500',
};

// Estilos de botones
export const buttonStyles = {
  // Botón primario (verde)
  primary: {
    container: 'bg-[#06D6A0] rounded-xl p-4',
    text: 'text-[#0B0F0E] font-semibold text-center text-base',
  },
  
  // Botón secundario
  secondary: {
    container: 'bg-gray-800 rounded-xl p-4',
    text: 'text-white font-semibold text-center text-base',
  },
  
  // Botón outline
  outline: {
    container: 'border-2 border-[#06D6A0] rounded-xl p-4',
    text: 'text-[#06D6A0] font-semibold text-center text-base',
  },
  
  // Botón de error/peligro
  danger: {
    container: 'bg-red-600 rounded-xl p-4',
    text: 'text-white font-semibold text-center text-base',
  },
  
  // Botón deshabilitado
  disabled: {
    container: 'bg-gray-600 rounded-xl p-4 opacity-50',
    text: 'text-gray-300 font-semibold text-center text-base',
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
    label: 'text-sm text-gray-400 mb-2 font-medium',
    input: 'bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base',
    inputFocused: 'border border-[#06D6A0]',
    error: 'text-sm text-red-500 mt-1',
  },
  
  // TextArea
  textarea: {
    container: 'mb-4',
    label: 'text-sm text-gray-400 mb-2 font-medium',
    input: 'bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base h-32',
  },
  
  // Input de búsqueda
  search: {
    container: 'bg-gray-800 rounded-xl px-4 py-3 flex-row items-center',
    input: 'flex-1 text-gray-100 ml-3 text-base',
  },
  
  // Input pequeño (para tablas)
  small: {
    input: 'bg-gray-700 text-white text-center rounded-lg py-2 w-full text-base',
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
  card: 'bg-gray-800 rounded-xl p-6',
  cardSmall: 'bg-gray-800 rounded-xl p-4',
  cardNoPadding: 'bg-gray-800 rounded-xl',
  
  // Secciones
  section: 'mb-6',
  sectionSmall: 'mb-4',
  
  // Headers
  header: 'flex-row items-center px-6 py-4 border-b border-gray-800',
};

// Estilos de bordes
export const borderStyles = {
  // Bordes sólidos
  solid: 'border border-gray-700',
  solidThick: 'border-2 border-gray-700',
  
  // Bordes punteados
  dashed: 'border-2 border-dashed border-gray-600',
  dashedAccent: 'border-2 border-dashed border-[#06D6A0]',
  
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
  success: 'bg-green-600 rounded-full px-3 py-1',
  error: 'bg-red-600 rounded-full px-3 py-1',
  warning: 'bg-yellow-600 rounded-full px-3 py-1',
  info: 'bg-blue-600 rounded-full px-3 py-1',
  neutral: 'bg-gray-600 rounded-full px-3 py-1',
};

// Estilos de tabs
export const tabStyles = {
  container: {
    backgroundColor: colors.background.primary,
    borderTopColor: colors.border.primary,
    borderTopWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  colors: {
    active: colors.accent.primary,
    inactive: colors.text.secondary,
  },
};

// Utilidad para combinar clases
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).join(' ');
};
