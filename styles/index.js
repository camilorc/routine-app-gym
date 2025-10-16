/**
 * Archivo de índice para exportar todos los estilos centralizados
 * 
 * Por defecto exporta el tema OSCURO (styleDark)
 * 
 * Para cambiar entre temas, comenta/descomenta las líneas correspondientes:
 * - styleDark: Tema oscuro (ACTIVO)
 * - styleLight: Tema claro (comentado)
 * 
 * Estructura:
 * - styleDark/: Estilos del tema oscuro
 * - styleLight/: Estilos del tema claro
 */

// ========================================
// TEMA OSCURO (ACTIVO)
// ========================================
export { colors, legacyColors } from './styleDark/colors';
export {
  textStyles,
  buttonStyles,
  inputStyles,
  containerStyles,
  borderStyles,
  spacingStyles,
  iconStyles,
  badgeStyles,
  tabStyles,
  combineStyles,
} from './styleDark/commonStyles';

// ========================================
// TEMA CLARO (DESACTIVADO)
// ========================================
// export { colors, legacyColors } from './styleLight/colors';
// export {
//   textStyles,
//   buttonStyles,
//   inputStyles,
//   containerStyles,
//   borderStyles,
//   spacingStyles,
//   iconStyles,
//   badgeStyles,
//   tabStyles,
//   combineStyles,
// } from './styleLight/commonStyles';
