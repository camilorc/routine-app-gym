# 🔐 Módulo de Autenticación

Este módulo contiene toda la lógica relacionada con la autenticación de usuarios en la aplicación.

## 📁 Estructura

```
auth/
├── AuthContext.js          # Contexto global de autenticación
├── supabaseClient.js      # Cliente de Supabase configurado
└── index.js               # Exportaciones del módulo

screens/auth/
├── AuthContainer.js       # Container principal de autenticación
├── LoginScreen.js         # Pantalla de inicio de sesión
├── RegisterScreen.js      # Pantalla de registro
├── ProfileScreen.js       # Pantalla de perfil de usuario
└── index.js              # Exportaciones de pantallas

components/auth/
├── AuthInput.js          # Componente de input reutilizable
├── AuthButton.js         # Componente de botón reutilizable
├── AuthHeader.js         # Componente de header reutilizable
├── AuthToggle.js         # Componente toggle login/registro
├── AuthLayout.js         # Layout base para pantallas auth
└── index.js              # Exportaciones de componentes

hooks/
├── useAuthForm.js        # Hook para manejo de formularios
├── useAuthValidation.js  # Validadores de formularios
└── index.js              # Exportaciones de hooks
```

## 🚀 Uso

### Importar el AuthProvider
```javascript
import { AuthProvider } from './auth';

function App() {
  return (
    <AuthProvider>
      {/* Tu aplicación */}
    </AuthProvider>
  );
}
```

### Usar el hook de autenticación
```javascript
import { useAuth } from './auth/AuthContext';

function MyComponent() {
  const { user, signIn, signUp, signOut, loading } = useAuth();
  
  // Tu lógica aquí
}
```

### Usar componentes de UI
```javascript
import { AuthInput, AuthButton, AuthHeader } from './components/auth';

function MyAuthScreen() {
  return (
    <>
      <AuthHeader title="Login" subtitle="Welcome back" iconName="person" />
      <AuthInput label="Email" value={email} onChangeText={setEmail} />
      <AuthButton title="Sign In" icon="log-in-outline" onPress={handleLogin} />
    </>
  );
}
```

## 🔧 Características

- ✅ **Separación de responsabilidades**: Lógica separada de UI
- ✅ **Componentes reutilizables**: Input, Button, Header, etc.
- ✅ **Validaciones centralizadas**: Todas las validaciones en un lugar
- ✅ **Hooks personalizados**: Lógica de formularios reutilizable
- ✅ **TypeScript ready**: Estructura preparada para TypeScript
- ✅ **Fácil testing**: Componentes y lógica separados para testing

## 🎯 Funcionalidades

### Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Logout seguro
- Gestión de sesiones automática

### Validaciones
- Email válido
- Contraseña mínima de 6 caracteres
- Confirmación de contraseña
- Nombre completo requerido

### UI/UX
- Formularios responsivos
- Estados de carga
- Mensajes de error claros
- Toggle entre login/registro
- Iconos vectoriales