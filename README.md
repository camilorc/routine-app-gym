# 🏋️‍♀️ Routine App Gym

Una aplicación móvil moderna para gestión de rutinas de gimnasio desarrollada con React Native + Expo, autenticación con Supabase y diseño minimalista.

## 🌟 Características

- **🧭 Navegación Bottom Tabs** - Interfaz intuitiva con pestañas inferiores
- **🔐 Autenticación Segura** - Login/logout con Supabase Backend
- **🎨 Diseño Minimalista** - Paleta verde oscuro premium y elegante
- **📱 SafeArea Compatible** - Optimizada para iPhone (incluye home indicator)
- **⚡ NativeWind v4** - Estilos con Tailwind CSS para React Native
- **🔧 TypeScript** - Tipado estático para mayor confiabilidad

## 🚀 Tecnologías

- **React Native** `0.81.4` - Framework de desarrollo móvil multiplataforma
- **Expo** `~54.0.10` - Plataforma de desarrollo y despliegue
- **NativeWind** `^4.0.0` - Tailwind CSS para React Native
- **Supabase** `^2.58.0` - Backend como servicio (BaaS)
- **React Navigation** `^7.1.17` - Navegación nativa
- **TypeScript** `~5.9.2` - Superset de JavaScript con tipado

## 🎨 Paleta de Colores

```javascript
const colors = {
  background: "#0B0F0E",    // Fondo principal negro/verde oscuro
  surface: "#1A1F1D",       // Fondo secundario
  textPrimary: "#F5F5F5",   // Texto principal
  textSecondary: "#A3A3A3", // Texto secundario
  accent: "#06D6A0",        // Verde brillante (acento)
  border: "#2E2E2E",        // Bordes
};
```

## 📱 Pantallas

### 🏠 Inicio
- Mensaje de bienvenida personalizado
- Muestra nombre del usuario si está autenticado
- Mensaje genérico para usuarios no autenticados

### 👤 Mi Cuenta
- **No autenticado**: Formulario de login (email + contraseña)
- **Autenticado**: Perfil del usuario con información y botón de logout

## ⚙️ Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app en tu dispositivo móvil

### 1. Clonar el repositorio
```bash
git clone https://github.com/camilorc/routine-app-gym.git
cd routine-app-gym
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Supabase (Opcional)
```bash
npm run setup
```
Sigue las instrucciones para ingresar tus credenciales de Supabase.

### 4. Ejecutar la aplicación
```bash
npm start
```

Escanea el código QR con Expo Go o presiona:
- `a` para Android
- `i` para iOS
- `w` para web

## 📁 Estructura del Proyecto

```
routine-app-gym/
├── App.tsx                 # Punto de entrada con navegación
├── components/
│   └── TabIcon.js         # Iconos vectoriales para tabs
├── contexts/
│   └── AuthContext.js     # Contexto global de autenticación
├── screens/
│   ├── HomeScreen.js      # Pantalla de inicio
│   └── AccountScreen.js   # Pantalla de cuenta/login
├── theme/
│   └── colors.js         # Paleta de colores centralizada
├── lib/
│   └── supabaseClient.js # Configuración de Supabase
└── assets/               # Recursos estáticos (íconos, imágenes)
```

## 🔐 Configuración de Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **Settings > API**
4. Ejecuta `npm run setup` y proporciona:
   - Project URL
   - Anon key

## 🎯 Scripts Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm run android    # Ejecuta en emulador Android
npm run ios        # Ejecuta en simulador iOS
npm run web        # Ejecuta en navegador web
npm run setup      # Configura credenciales de Supabase
```

## 🛡️ Seguridad

- ✅ Credenciales de Supabase en `.gitignore`
- ✅ Validación de formularios
- ✅ Manejo seguro de estados de autenticación
- ✅ Contexto React para estado global

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature: `git checkout -b feature/nueva-caracteristica`
3. Commit tus cambios: `git commit -m 'Add: nueva característica'`
4. Push a la rama: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🔗 Links Útiles

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)

## 👨‍💻 Autor

**Camilo RC** - [@camilorc](https://github.com/camilorc)

---

⭐ ¡Si te gusta el proyecto, no olvides darle una estrella!