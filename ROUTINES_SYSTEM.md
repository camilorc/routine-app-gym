# Sistema de Rutinas - Documentación

## 📁 Archivos Creados/Modificados

### Nuevo Archivo
- `screens/RoutinesListScreen.js` - Pantalla principal para listar rutinas guardadas

### Archivos Modificados
- `screens/CreateRoutineScreen.js` - Agregado botón "atrás" y sincronización de rutinas
- `App.tsx` - Actualizada navegación para incluir la nueva pantalla

## 🔄 Flujo de Navegación

```
Tab Navigator (Rutinas) 
    ↓
RoutinesListScreen (lista de rutinas)
    ↓ (botón +)
CreateRoutineScreen (crear/editar rutina)
    ↓ (añadir ejercicios)
AddExerciseScreen (agregar ejercicio)
    ↓ (guardar)
CreateRoutineScreen
    ↓ (crear rutina)
RoutinesListScreen (actualizada con nueva rutina)
```

## 📊 Estructura de Datos

### Objeto Rutina
```javascript
{
  id: "1729267234567",           // String único (timestamp)
  name: "Rutina de Fuerza",      // String
  description: "Descripción...",  // String
  exercises: [...],               // Array de ejercicios
  createdAt: "2025-10-18T..."    // ISO String
}
```

### Objeto Ejercicio
```javascript
{
  name: "Press de Banca",
  description: "Descripción...",
  series: [
    { id: "...", series: "5", reps: "10", weight: "80", rir: "2" }
  ],
  restTime: "2m 30s"
}
```

## 🎨 Características Implementadas

### RoutinesListScreen
✅ Header con título "Mis Rutinas" y botón +
✅ Estado vacío con mensaje amigable
✅ Lista de rutinas con:
  - Icono de la rutina
  - Nombre y descripción
  - Cantidad de ejercicios y series totales
  - Botón Play para iniciar
  - Botón de menú (tres puntos)
✅ Navegación al presionar el botón +

### CreateRoutineScreen
✅ Botón "atrás" en el header
✅ Sincronización de rutinas mediante navigation params
✅ Navegación automática a RoutinesListScreen al crear
✅ Limpieza del formulario después de crear
✅ Manejo de rutinas en memoria (temporal)

## 🔜 Pendientes para el Futuro

- [ ] Integración con base de datos
- [ ] Editar rutinas existentes
- [ ] Eliminar rutinas
- [ ] Pantalla de detalle/ejecución de rutina
- [ ] Duplicar rutinas
- [ ] Filtros y búsqueda de rutinas
- [ ] Estadísticas de progreso

## 💾 Almacenamiento Actual

**Tipo**: En memoria (state + navigation params)
**Persistencia**: No (se pierden al recargar la app)
**Próximo paso**: Migrar a AsyncStorage o Supabase

