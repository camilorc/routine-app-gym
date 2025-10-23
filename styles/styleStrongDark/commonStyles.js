import { colors } from './colors';

// Estilos de texto
export const textStyles = {
  // Títulos
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-semibold',
  
  // Cuerpo
  body: 'text-base',
  bodySecondary: 'text-base',
  bodySmall: 'text-sm',
  bodySmallSecondary: 'text-sm',
  
  // Labels
  label: 'text-sm font-medium',
  labelBold: 'text-sm font-semibold',
  
  // Especiales
  caption: 'text-xs',
  link: 'text-base underline',
  error: 'text-sm',
};

// Estilos de botones
export const buttonStyles = {
  // Botón primario (naranja)
  primary: {
    container: 'rounded-xl p-4',
    text: 'font-semibold text-center text-base',
  },
  
  // Botón secundario
  secondary: {
    container: 'rounded-xl p-4',
    text: 'font-semibold text-center text-base',
  },
  
  // Botón outline
  outline: {
    container: 'border-2 rounded-xl p-4',
    text: 'font-semibold text-center text-base',
  },
  
  // Botón de error/peligro
  danger: {
    container: 'rounded-xl p-4',
    text: 'font-semibold text-center text-base',
  },
  
  // Botón deshabilitado
  disabled: {
    container: 'rounded-xl p-4 opacity-50',
    text: 'font-semibold text-center text-base',
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
    label: 'text-sm mb-2 font-medium',
    input: 'rounded-xl px-4 py-4 text-base',
    inputFocused: 'border',
    error: 'text-sm mt-1',
  },
  
  // TextArea
  textarea: {
    container: 'mb-4',
    label: 'text-sm mb-2 font-medium',
    input: 'rounded-xl px-4 py-4 text-base h-32',
  },
  
  // Input de búsqueda
  search: {
    container: 'rounded-xl px-4 py-3 flex-row items-center',
    input: 'flex-1 ml-3 text-base',
  },
  
  // Input pequeño (para tablas)
  small: {
    input: 'text-center rounded-lg py-2 w-full text-base',
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
  card: 'rounded-xl p-6',
  cardSmall: 'rounded-xl p-4',
  cardNoPadding: 'rounded-xl',
  
  // Secciones
  section: 'mb-6',
  sectionSmall: 'mb-4',
  
  // Headers
  header: 'flex-row items-center px-6 py-4 border-b',
};

// Estilos de bordes
export const borderStyles = {
  // Bordes sólidos
  solid: 'border',
  solidThick: 'border-2',
  
  // Bordes punteados
  dashed: 'border-2 border-dashed',
  dashedAccent: 'border-2 border-dashed',
  
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
  success: 'rounded-full px-3 py-1',
  error: 'rounded-full px-3 py-1',
  warning: 'rounded-full px-3 py-1',
  info: 'rounded-full px-3 py-1',
  neutral: 'rounded-full px-3 py-1',
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

// Función helper para combinar estilos (opcional)
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).join(' ');
};
