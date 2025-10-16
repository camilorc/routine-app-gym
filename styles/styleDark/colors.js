// Paleta de colores de la aplicación
export const colors = {
  // Fondos
  background: {
    primary: "#0B0F0E",        // Fondo principal negro/verde oscuro
    secondary: "#1F2937",      // Fondo secundario (gray-800)
    tertiary: "#374151",       // Fondo terciario (gray-700)
  },
  
  // Textos
  text: {
    primary: "#F5F5F5",        // Texto principal blanco
    secondary: "#A3A3A3",      // Texto secundario gris
    tertiary: "#6B7280",       // Texto terciario (gray-500)
  },
  
  // Acentos
  accent: {
    primary: "#06D6A0",        // Verde brillante principal
    secondary: "#05C091",      // Verde hover/pressed
    tertiary: "#04A779",       // Verde oscuro
    bright: "#059669",         // Verde más oscuro para botones (menos brillante)
  },
  
  // Bordes
  border: {
    primary: "#374151",        // Borde principal (gray-700)
    secondary: "#4B5563",      // Borde secundario (gray-600)
    light: "#6B7280",          // Borde claro (gray-500)
  },
  
  // Estados
  error: "#EF4444",            // Rojo para errores
  warning: "#F59E0B",          // Amarillo para advertencias
  success: "#10B981",          // Verde para éxito
  info: "#3B82F6",             // Azul para información
  
  // Otros
  disabled: "#4B5563",         // Color para elementos deshabilitados
  placeholder: "#9CA3AF",      // Color para placeholders
  overlay: "rgba(0, 0, 0, 0.5)", // Overlay oscuro
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
