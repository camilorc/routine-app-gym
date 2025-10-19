# Fix: Sistema de Rutinas - Persistencia con Context

## 🐛 Problema
Las rutinas creadas no se mostraban en `RoutinesListScreen` porque se estaban pasando mediante navigation params, pero cuando la pantalla se montaba desde el Tab Navigator, no tenía acceso a esos params.

## ✅ Solución
Implementar **React Context** para compartir el estado de las rutinas globalmente en toda la aplicación.

## 📁 Archivos Creados

### `contexts/RoutinesContext.js` (NUEVO)
Context Provider que mantiene el estado de las rutinas y proporciona funciones para:
- `addRoutine()` - Agregar nueva rutina
- `updateRoutine()` - Actualizar rutina existente
- `deleteRoutine()` - Eliminar rutina
- `routines` - Array de rutinas disponible globalmente

## 📝 Archivos Modificados

### `App.tsx`
```tsx
// Agregado import
import { RoutinesProvider } from './contexts/RoutinesContext';

// Envuelto NavigationContainer con RoutinesProvider
<RoutinesProvider>
  <NavigationContainer>
    ...
  </NavigationContainer>
</RoutinesProvider>
```

### `screens/RoutinesListScreen.js`
```javascript
// Cambiado de navigation params a Context
import { useRoutines } from '../contexts/RoutinesContext';

const { routines } = useRoutines();
// Ya no usa route.params?.routines
```

### `screens/CreateRoutineScreen.js`
```javascript
// Cambiado de navigation params a Context
import { useRoutines } from '../contexts/RoutinesContext';

const { addRoutine } = useRoutines();

// En handleCreateRoutine:
addRoutine(newRoutine);  // Usa context en vez de navigation params
navigation.navigate('RoutinesList');  // Sin params
```

## 🔄 Flujo Actualizado

1. Usuario crea rutina en `CreateRoutineScreen`
2. Se llama a `addRoutine(newRoutine)` del Context
3. El Context actualiza su estado global
4. Se navega a `RoutinesListScreen`
5. `RoutinesListScreen` lee `routines` del Context
6. ✅ Las rutinas se muestran correctamente

## 💾 Ventajas de este Enfoque

- ✅ Estado compartido entre todas las pantallas
- ✅ No depende de navigation params
- ✅ Más fácil de mantener y escalar
- ✅ Listo para migrar a AsyncStorage o BD
- ✅ Single source of truth

## 🔜 Próximos Pasos

El Context está preparado para:
- Agregar persistencia con AsyncStorage
- Implementar editar rutina (`updateRoutine`)
- Implementar eliminar rutina (`deleteRoutine`)
- Sincronizar con Supabase cuando esté listo

## 🧪 Prueba

1. Abre la app
2. Ve al tab "Rutinas"
3. Presiona el botón "+"
4. Crea una rutina con ejercicios
5. Presiona "Crear Rutina"
6. ✨ Deberías ver la rutina en la lista
7. Crea otra rutina
8. ✨ Ambas rutinas deberían estar visibles

