// Paleta de colores Strongo Dark - Inspirada en el logo naranja y azul
export const colors = {
  // Fondos
  background: {
    primary: "#0B0C10",        // Fondo principal negro grafito
    secondary: "#1F242C",      // Contenedores / tarjetas
    tertiary: "#2C3038",       // Fondos alternativos
  },

  // Textos
  text: {
    primary: "#F9FAFB",        // Texto principal blanco grisáceo
    secondary: "#A0A6B0",      // Texto secundario gris claro
    tertiary: "#6B7280",       // Texto tenue
  },

  // Acentos
  accent: {
    primary: "#FF8A00",        // Naranja principal del logo
    secondary: "#FFB84D",      // Naranja claro (hover o gradiente)
    tertiary: "#E67A00",       // Naranja oscuro
    bright: "#FF8A00",         // Naranja brillante para botones
    orange: "#FF8A00",         // Naranja principal del logo
    orangeLight: "#FFB84D",    // Versión clara (hover o gradiente)
    blue: "#007BFF",           // Azul principal del logo
    blueLight: "#33A1FF",      // Azul claro (hover o iluminación)
  },

  // Bordes
  border: {
    primary: "#2C3038",
    secondary: "#3F4650",
    light: "#5A616C",
  },

  // Estados
  error: "#EF4444",
  warning: "#F59E0B",
  success: "#22C55E",
  info: "#3B82F6",

  // Otros
  disabled: "#4B5563",
  placeholder: "#9CA3AF",
  overlay: "rgba(0, 0, 0, 0.6)",
};

// Exportación legacy para compatibilidad
export const legacyColors = {
  background: colors.background.primary,
  surface: colors.background.secondary,
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
  accent: colors.accent.primary,
  border: colors.border.primary,
};
