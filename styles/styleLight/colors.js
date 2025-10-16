// Paleta de colores del tema claro
export const colors = {
  // Fondos
  background: {
    primary: "#F9FAFB",        // Fondo principal (gris muy claro)
    secondary: "#FFFFFF",      // Contenedores / tarjetas
    tertiary: "#F3F4F6",       // Fondo suave para secciones alternas
  },

  // Textos
  text: {
    primary: "#111827",        // Texto principal (gris casi negro)
    secondary: "#4B5563",      // Texto secundario
    tertiary: "#9CA3AF",       // Texto tenue o placeholder
  },

  // Acentos (verde característico ChatGPT)
  accent: {
    primary: "#10A37F",        // Verde principal
    secondary: "#0E8F70",      // Hover o estado activo
    tertiary: "#0B6F56",       // Verde profundo para contrastes
    bright: "#059669",         // Verde brillante para botones destacados
  },

  // Bordes
  border: {
    primary: "#E5E7EB",        // Borde general (gris claro)
    secondary: "#D1D5DB",      // Borde en inputs / tarjetas
    light: "#D1D5DB",          // Borde visible para inputs (gris más fuerte)
  },

  // Estados
  error: "#DC2626",            // Rojo (error)
  warning: "#F59E0B",          // Amarillo (advertencia)
  success: "#16A34A",          // Verde (éxito)
  info: "#3B82F6",             // Azul (información)

  // Otros
  disabled: "#D1D5DB",         // Elementos deshabilitados
  placeholder: "#9CA3AF",      // Placeholder texto
  overlay: "rgba(0,0,0,0.05)", // Overlay suave
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
