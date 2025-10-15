# Estilos de la Aplicación

Esta carpeta contiene todos los estilos centralizados de la aplicación organizados por temas.

## Estructura

```
styles/
├── styleDark/              # Tema oscuro (actual)
│   ├── colors.js          # Paleta de colores
│   ├── commonStyles.js    # Estilos comunes
│   ├── examples.js        # Ejemplos de uso
│   └── README.md          # Documentación detallada
├── index.js               # Exportaciones principales
└── README.md              # Este archivo
```

## Uso Básico

### Importar estilos

```javascript
// Importar desde el índice principal
import { colors, buttonStyles, textStyles } from './styles';

// O importar todo
import * as styles from './styles';
```

### Ejemplo rápido

```javascript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, textStyles, buttonStyles, containerStyles } from './styles';

export const MiComponente = () => {
  return (
    <View className={containerStyles.screen}>
      <View className={containerStyles.content}>
        <Text className={textStyles.h1}>Título</Text>
        <Text className={textStyles.bodySecondary}>Descripción</Text>
        
        <TouchableOpacity className={buttonStyles.primary.container}>
          <Text className={buttonStyles.primary.text}>
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
```

## Temas Disponibles

### styleDark (Actual)
Tema oscuro con los siguientes colores principales:
- **Fondo**: #0B0F0E (negro/verde oscuro)
- **Acento**: #06D6A0 (verde brillante)
- **Texto**: #F5F5F5 (blanco)

## Colores Principales

```javascript
colors.background.primary    // #0B0F0E - Fondo principal
colors.background.secondary  // #1F2937 - Fondo secundario
colors.text.primary          // #F5F5F5 - Texto principal
colors.text.secondary        // #A3A3A3 - Texto secundario
colors.accent.primary        // #06D6A0 - Verde brillante
colors.border.primary        // #374151 - Bordes
```

## Estilos Comunes

### Textos
- `textStyles.h1` - Título grande
- `textStyles.h2` - Título mediano
- `textStyles.body` - Texto normal
- `textStyles.bodySecondary` - Texto secundario

### Botones
- `buttonStyles.primary` - Botón verde principal
- `buttonStyles.secondary` - Botón gris secundario
- `buttonStyles.outline` - Botón con borde
- `buttonStyles.danger` - Botón rojo de peligro

### Inputs
- `inputStyles.base` - Input estándar
- `inputStyles.textarea` - Área de texto
- `inputStyles.search` - Búsqueda

### Contenedores
- `containerStyles.screen` - Pantalla completa
- `containerStyles.content` - Contenedor con padding
- `containerStyles.card` - Tarjeta

## Documentación Completa

Para ver la documentación completa, ejemplos detallados y mejores prácticas, consulta:

📖 [Documentación del tema Dark](./styleDark/README.md)

## Agregar Nuevos Temas

Para agregar un nuevo tema (ej: styleLight):

1. Crea una nueva carpeta: `styles/styleLight/`
2. Copia la estructura de `styleDark/`
3. Modifica los colores y estilos según el nuevo tema
4. Actualiza `index.js` para exportar el nuevo tema
5. Documenta los cambios en este README

## Migración desde theme/colors.js

Si estás migrando código que ya no existe:

```javascript
// Antiguo (eliminado)
// import { colors } from '../theme/colors';

// Ahora
import { colors } from '../styles';
// O si necesitas compatibilidad legacy:
import { legacyColors as colors } from '../styles';
```

## Notas

- ✅ La carpeta `theme/` ha sido eliminada completamente
- 🎨 Todos los nuevos componentes deben usar `styles/`
- 📦 Los estilos están optimizados para NativeWind y Tailwind CSS
- 🔄 Puedes mezclar clases de Tailwind con los estilos centralizados
