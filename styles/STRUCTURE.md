# Estructura de Estilos

```
appStrongo/
└── styles/                          # ✨ ESTRUCTURA DE ESTILOS
    ├── index.js                     # Exportaciones principales (styleDark por defecto)
    ├── README.md                    # Documentación principal
    ├── STRUCTURE.md                 # Este archivo
    │
    ├── styleDark/                   # 🌑 Tema oscuro (PREDETERMINADO)
    │   ├── colors.js                # Paleta de colores del tema oscuro
    │   ├── commonStyles.js          # Estilos comunes (botones, inputs, etc.)
    │   ├── examples.js              # Ejemplos de uso
    │   └── README.md                # Documentación del tema oscuro
    │
    └── styleLight/                  # ☀️ Tema claro
        ├── colors.js                # Paleta de colores del tema claro
        ├── commonStyles.js          # Estilos comunes (botones, inputs, etc.)
        ├── examples.js              # Ejemplos de uso
        └── README.md                # Documentación del tema claro
```

## 📦 Archivos por Carpeta

### `/styles` (Raíz)
- **index.js**: Punto de entrada principal que exporta todos los estilos
- **README.md**: Documentación general y guía de uso

### `/styles/styleDark` (Tema Oscuro)
- **colors.js**: Define toda la paleta de colores
- **commonStyles.js**: Define todos los estilos reutilizables
- **examples.js**: Componentes de ejemplo usando los estilos
- **README.md**: Guía detallada del tema oscuro

## 🎨 Contenido de cada archivo

### `colors.js`
```javascript
colors.background.primary    // #0B0F0E
colors.background.secondary  // #1F2937
colors.text.primary          // #F5F5F5
colors.accent.primary        // #06D6A0
// ... más colores organizados
```

### `commonStyles.js`
```javascript
textStyles       // Estilos de texto (h1-h4, body, etc.)
buttonStyles     // Estilos de botones (primary, secondary, etc.)
inputStyles      // Estilos de inputs y textareas
containerStyles  // Estilos de contenedores y pantallas
borderStyles     // Estilos de bordes
spacingStyles    // Márgenes y padding
iconStyles       // Tamaños y colores de iconos
badgeStyles      // Estilos de badges/etiquetas
tabStyles        // Estilos para tabs de navegación
combineStyles()  // Utilidad para combinar clases
```

## 🔄 Flujo de Uso

```
Componente
    ↓
import { colors, buttonStyles } from './styles'
    ↓
styles/index.js
    ↓
styles/styleDark/colors.js
styles/styleDark/commonStyles.js
```

## 📝 Ejemplo de Uso

```javascript
// En cualquier pantalla o componente
import { 
  colors, 
  textStyles, 
  buttonStyles,
  containerStyles 
} from '../styles';

// Usar en el componente
<View className={containerStyles.screen}>
  <Text className={textStyles.h1}>Título</Text>
  <TouchableOpacity className={buttonStyles.primary.container}>
    <Text className={buttonStyles.primary.text}>Botón</Text>
  </TouchableOpacity>
</View>
```

## 🚀 Beneficios de esta Estructura

1. **Organizada**: Todo centralizado en una ubicación
2. **Escalable**: Fácil agregar nuevos temas (styleLight, etc.)
3. **Mantenible**: Un solo lugar para cambiar estilos
4. **Consistente**: Mismos estilos en toda la app
5. **Documentada**: README en cada nivel
6. **Tipada**: Fácil de autocompletar en el IDE

## 🎨 Temas Disponibles

```
styles/
├── styleDark/      # ✅ Tema oscuro (predeterminado)
│   └── Negro/verde con acentos brillantes
├── styleLight/     # ✅ Tema claro
│   └── Blanco/gris con verde estilo ChatGPT
└── styleCustom/    # 💡 Futuro: Personalizable por usuario
```

### Comparación de Temas

| Característica | styleDark | styleLight |
|---------------|-----------|------------|
| Fondo principal | #0B0F0E (muy oscuro) | #F9FAFB (muy claro) |
| Contenedores | #1F2937 (gris oscuro) | #FFFFFF (blanco) |
| Texto principal | #F5F5F5 (blanco) | #111827 (casi negro) |
| Acento | #06D6A0 (verde brillante) | #10A37F (verde ChatGPT) |
| Bordes | #374151 (gris oscuro) | #E5E7EB (gris claro) |
| Uso recomendado | Ambientes con poca luz | Ambientes con buena iluminación |
