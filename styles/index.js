/**
 * Archivo de índice para exportar todos los estilos centralizados
 * 
 * Por defecto exporta el tema STRONGO DARK
 * 
 * Para cambiar entre temas, comenta/descomenta las líneas correspondientes:
 * - styleStrongDark: Tema oscuro con colores Strongo (ACTIVO)
 * - styleDark: Tema oscuro verde
 * - styleLight: Tema claro
 * 
 * Estructura:
 * - styleStrongDark/: Estilos del tema Strongo (naranja y azul)
 * - styleDark/: Estilos del tema oscuro verde
 * - styleLight/: Estilos del tema claro
 */

// ========================================
// TEMA STRONGO DARK (ACTIVO)
// ========================================
export { colors, legacyColors } from './styleStrongDark/colors';
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
} from './styleStrongDark/commonStyles';

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

// ========================================
// TEMA OSCURO VERDE (DESACTIVADO)
// ========================================
// export { colors, legacyColors } from './styleDark/colors';
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
// } from './styleDark/commonStyles';
