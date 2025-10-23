# Tema Strongo Dark

Tema oscuro personalizado con la paleta de colores del logo de Strongo (naranja y azul).

## Paleta de Colores

### Fondos
- **Primary**: `#0B0C10` - Negro grafito para el fondo principal
- **Secondary**: `#1F242C` - Contenedores y tarjetas
- **Tertiary**: `#2C3038` - Fondos alternativos

### Textos
- **Primary**: `#F9FAFB` - Blanco grisáceo para texto principal
- **Secondary**: `#A0A6B0` - Gris claro para texto secundario
- **Tertiary**: `#6B7280` - Gris tenue para texto de menor importancia

### Acentos
- **Orange**: `#FF8A00` - Naranja principal del logo
- **Orange Light**: `#FFB84D` - Naranja claro para hover y gradientes
- **Blue**: `#007BFF` - Azul principal del logo
- **Blue Light**: `#33A1FF` - Azul claro para efectos de iluminación

### Bordes
- **Primary**: `#2C3038`
- **Secondary**: `#3F4650`
- **Light**: `#5A616C`

### Estados
- **Error**: `#EF4444` - Rojo para errores
- **Warning**: `#F59E0B` - Amarillo para advertencias
- **Success**: `#22C55E` - Verde para éxito
- **Info**: `#3B82F6` - Azul para información

## Uso

```javascript
import { colors, buttonStyles, textStyles } from '../styles/styleStrongDark';

// Usar colores directamente
style={{ backgroundColor: colors.background.primary }}

// Usar estilos predefinidos
className={buttonStyles.primary.container}
```

## Características

- Tema oscuro moderno con alto contraste
- Colores naranja y azul que reflejan la identidad de marca Strongo
- Paleta optimizada para legibilidad en pantallas
- Soporte para estados (error, warning, success, info)
- Sistema de colores coherente y escalable
