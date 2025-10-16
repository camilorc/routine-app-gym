# Guía de Uso de Estilos - Tema Claro

Esta carpeta contiene todos los estilos del tema claro de la aplicación.

## Estructura

```
styleLight/
├── colors.js          # Paleta de colores del tema claro
├── commonStyles.js    # Estilos comunes (botones, inputs, contenedores, etc.)
├── examples.js        # Ejemplos de uso
└── README.md          # Este archivo
```

## Tema Claro

El tema claro está inspirado en interfaces modernas con:
- **Fondo principal**: #F9FAFB (gris muy claro)
- **Contenedores**: #FFFFFF (blanco puro)
- **Acento principal**: #10A37F (verde característico estilo ChatGPT)
- **Texto principal**: #111827 (gris casi negro)

## Uso

### Importar estilos

```javascript
// Importar todo
import * as stylesLight from '../styles/styleLight';

// O importar específicos
import { colors, buttonStyles, textStyles } from '../styles/styleLight';
```

### Ejemplos de uso

#### 1. Textos

```javascript
<Text className={textStyles.h1}>Título Principal</Text>
<Text className={textStyles.body}>Texto normal</Text>
<Text className={textStyles.bodySecondary}>Texto secundario</Text>
```

#### 2. Botones

```javascript
// Botón primario (verde)
<TouchableOpacity className={buttonStyles.primary.container}>
  <Text className={buttonStyles.primary.text}>
    Guardar
  </Text>
</TouchableOpacity>

// Botón con icono
<TouchableOpacity className={combineStyles(
  buttonStyles.primary.container,
  buttonStyles.withIcon
)}>
  <Ionicons name="save" size={20} color="#FFFFFF" />
  <Text className={combineStyles(
    buttonStyles.primary.text,
    buttonStyles.iconSpacing
  )}>
    Guardar
  </Text>
</TouchableOpacity>
```

#### 3. Inputs

```javascript
<View className={inputStyles.base.container}>
  <Text className={inputStyles.base.label}>
    Nombre
  </Text>
  <TextInput
    className={inputStyles.base.input}
    placeholderTextColor={colors.text.tertiary}
  />
</View>
```

#### 4. Contenedores

```javascript
<SafeAreaView className={containerStyles.screen}>
  <View className={containerStyles.content}>
    <View className={containerStyles.card}>
      {/* Contenido */}
    </View>
  </View>
</SafeAreaView>
```

#### 5. Colores en componentes

```javascript
// Usar colores directamente
<Ionicons 
  name="heart" 
  size={24} 
  color={colors.accent.primary} 
/>

<View style={{ backgroundColor: colors.background.secondary }}>
  {/* Contenido */}
</View>
```

## Colores Disponibles

### Fondos
- `colors.background.primary` - #F9FAFB (gris muy claro)
- `colors.background.secondary` - #FFFFFF (blanco)
- `colors.background.tertiary` - #F3F4F6 (gris suave)

### Textos
- `colors.text.primary` - #111827 (casi negro)
- `colors.text.secondary` - #4B5563 (gris medio)
- `colors.text.tertiary` - #9CA3AF (gris claro)

### Acentos
- `colors.accent.primary` - #10A37F (verde principal)
- `colors.accent.secondary` - #0E8F70 (verde hover)
- `colors.accent.tertiary` - #0B6F56 (verde profundo)

### Bordes
- `colors.border.primary` - #E5E7EB (gris claro)
- `colors.border.secondary` - #D1D5DB (gris medio)
- `colors.border.light` - #F3F4F6 (muy claro)

### Estados
- `colors.error` - #DC2626 (rojo)
- `colors.warning` - #F59E0B (amarillo)
- `colors.success` - #16A34A (verde)
- `colors.info` - #3B82F6 (azul)

## Diferencias con styleDark

### Fondos
- ✨ Fondo principal más claro (#F9FAFB vs #0B0F0E)
- ✨ Contenedores blancos con sombras sutiles
- ✨ Bordes visibles y definidos

### Textos
- ✨ Texto oscuro sobre fondo claro (mejor legibilidad)
- ✨ Mayor contraste en jerarquía de textos

### Acentos
- ✨ Verde más brillante y saturado (#10A37F)
- ✨ Mejor contraste sobre fondos claros

### Inputs
- ✨ Fondo blanco con bordes definidos
- ✨ Sombras sutiles para profundidad

### Cards
- ✨ Sombras ligeras para elevación visual
- ✨ Bordes sutiles para definición

## Mejores Prácticas

1. **Usar siempre los estilos centralizados** en lugar de crear estilos inline
2. **Usar `combineStyles()`** para combinar múltiples clases
3. **No hardcodear colores**, usar siempre la paleta de `colors`
4. **Mantener consistencia** usando los mismos estilos en componentes similares
5. **Considerar accesibilidad**: el tema claro tiene mejor contraste en luz brillante

## Agregar Nuevos Estilos

Si necesitas agregar nuevos estilos:

1. Agrégalos en `commonStyles.js` en la sección correspondiente
2. Sigue el patrón de nomenclatura existente
3. Asegúrate de que funcionen bien con los colores claros
4. Documenta su uso en este README

## Cambiar entre Temas

Para cambiar de tema oscuro a claro:

```javascript
// En lugar de:
import { colors } from './styles/styleDark';

// Usa:
import { colors } from './styles/styleLight';
```

En el futuro, esto se podrá hacer dinámicamente con un contexto de tema.
