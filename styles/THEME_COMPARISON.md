# Comparación de Temas: Dark vs Light

Este documento muestra las diferencias visuales y de uso entre los temas oscuro y claro.

## 📊 Tabla Comparativa de Colores

| Elemento | styleDark | styleLight |
|----------|-----------|------------|
| **Fondo Principal** | `#0B0F0E` (Negro verdoso) | `#F9FAFB` (Gris muy claro) |
| **Contenedores** | `#1F2937` (Gris oscuro) | `#FFFFFF` (Blanco) |
| **Texto Principal** | `#F5F5F5` (Blanco) | `#111827` (Casi negro) |
| **Texto Secundario** | `#A3A3A3` (Gris medio) | `#4B5563` (Gris medio) |
| **Acento Principal** | `#06D6A0` (Verde brillante) | `#10A37F` (Verde ChatGPT) |
| **Bordes** | `#374151` (Gris oscuro) | `#E5E7EB` (Gris claro) |
| **Error** | `#EF4444` (Rojo brillante) | `#DC2626` (Rojo) |
| **Success** | `#10B981` (Verde éxito) | `#16A34A` (Verde éxito) |

## 🎨 Características Visuales

### Tema Oscuro (styleDark)
- ✅ Reduce fatiga visual en ambientes con poca luz
- ✅ Ahorra batería en pantallas OLED
- ✅ Estética moderna y elegante
- ✅ Colores más saturados y vibrantes
- ⚠️ Menor contraste puede dificultar lectura en luz brillante

### Tema Claro (styleLight)
- ✅ Mejor legibilidad en ambientes iluminados
- ✅ Mayor contraste para mejor accesibilidad
- ✅ Aspecto más profesional y limpio
- ✅ Estándar en aplicaciones de productividad
- ⚠️ Puede causar más fatiga visual en oscuridad

## 💡 Cuándo Usar Cada Tema

### styleDark (Recomendado para)
- 🌙 Uso nocturno
- 🎮 Aplicaciones de entretenimiento
- 💪 Apps de fitness/gimnasio (actual)
- 🎨 Interfaces creativas
- 📱 Usuarios que prefieren AMOLED

### styleLight (Recomendado para)
- ☀️ Uso diurno
- 📊 Aplicaciones de productividad
- 📝 Apps con mucho texto
- 👴 Mayor accesibilidad
- 💼 Entornos profesionales/oficina

## 🔧 Cómo Implementar el Cambio

### Opción 1: Cambio Manual (Actual)

```javascript
// Usar tema oscuro (predeterminado)
import { colors, buttonStyles } from '../styles';

// Usar tema claro
import { colors, buttonStyles } from '../styles/styleLight';
```

### Opción 2: Cambio Dinámico (Futuro)

```javascript
// Crear un contexto de tema
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // 'dark' o 'light'
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

```javascript
// Usar en componentes
import { useTheme } from '../context/ThemeContext';
import * as styleDark from '../styles/styleDark';
import * as styleLight from '../styles/styleLight';

export function MiComponente() {
  const { theme } = useTheme();
  const styles = theme === 'dark' ? styleDark : styleLight;
  
  return (
    <View className={styles.containerStyles.screen}>
      <Text className={styles.textStyles.h1}>Hola</Text>
    </View>
  );
}
```

### Opción 3: Preferencia del Sistema (Más Avanzado)

```javascript
import { useColorScheme } from 'react-native';

export function MiComponente() {
  const systemTheme = useColorScheme(); // 'dark' o 'light'
  const styles = systemTheme === 'dark' ? styleDark : styleLight;
  
  return (
    <View className={styles.containerStyles.screen}>
      {/* Contenido */}
    </View>
  );
}
```

## 📝 Ejemplos de Código

### Botón Primario - Comparación

```javascript
// styleDark
<TouchableOpacity className="bg-[#06D6A0] rounded-xl p-4">
  <Text className="text-[#0B0F0E] font-semibold text-center">
    Guardar
  </Text>
</TouchableOpacity>

// styleLight
<TouchableOpacity className="bg-[#10A37F] rounded-xl p-4">
  <Text className="text-white font-semibold text-center">
    Guardar
  </Text>
</TouchableOpacity>
```

### Input - Comparación

```javascript
// styleDark
<TextInput
  className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4"
  placeholderTextColor="#A3A3A3"
/>

// styleLight
<TextInput
  className="bg-white text-gray-900 rounded-xl px-4 py-4 border border-gray-300"
  placeholderTextColor="#9CA3AF"
/>
```

### Card - Comparación

```javascript
// styleDark
<View className="bg-gray-800 rounded-xl p-6">
  <Text className="text-white text-xl font-bold">
    Mi Rutina
  </Text>
</View>

// styleLight
<View className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
  <Text className="text-gray-900 text-xl font-bold">
    Mi Rutina
  </Text>
</View>
```

## 🚀 Roadmap Futuro

- [ ] Implementar ThemeContext para cambio dinámico
- [ ] Agregar toggle de tema en configuración
- [ ] Persistir preferencia de tema (AsyncStorage)
- [ ] Soporte para tema automático según hora del día
- [ ] Transiciones suaves entre temas
- [ ] Modo "Auto" que sigue preferencia del sistema
- [ ] Tema personalizado por usuario

## 💾 Persistencia de Tema

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar preferencia
await AsyncStorage.setItem('theme', 'dark');

// Leer preferencia
const savedTheme = await AsyncStorage.getItem('theme') || 'dark';

// Implementar en ThemeProvider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Cargar tema guardado al iniciar
    loadTheme();
  }, []);
  
  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  };
  
  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## 📱 Vista Previa Visual

### Pantalla de Inicio

**Dark Theme:**
```
┌─────────────────────────┐
│ ███ Home (dark)    ███  │ ← #0B0F0E background
│                         │
│  ╔═══════════════════╗  │
│  ║ Bienvenido        ║  │ ← #F5F5F5 text
│  ║ Usuario           ║  │ ← #06D6A0 accent
│  ╚═══════════════════╝  │ ← #1F2937 card
│                         │
│  [  Crear Rutina  ]    │ ← #06D6A0 button
│                         │
└─────────────────────────┘
```

**Light Theme:**
```
┌─────────────────────────┐
│     Home (light)        │ ← #F9FAFB background
│                         │
│  ┌───────────────────┐  │
│  │ Bienvenido        │  │ ← #111827 text
│  │ Usuario           │  │ ← #10A37F accent
│  └───────────────────┘  │ ← #FFFFFF card
│                         │
│  [  Crear Rutina  ]    │ ← #10A37F button
│                         │
└─────────────────────────┘
```

## 🎯 Recomendaciones

1. **Usar styleDark como predeterminado** para la app de gimnasio (ambiente típicamente oscuro)
2. **Ofrecer styleLight como opción** en configuración para usuarios que prefieran
3. **Implementar cambio automático** según hora del día (opcional)
4. **Mantener consistencia** en el uso de estilos dentro de cada tema
5. **Probar accesibilidad** en ambos temas con diferentes niveles de visión

## 📚 Referencias

- [Material Design - Dark Theme](https://material.io/design/color/dark-theme.html)
- [Apple HIG - Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
