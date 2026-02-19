# 🔧 Solución al Error RLS en Exercises

## Error
```
ERROR Error creating exercise: {"code": "42501", "details": null, "hint": null, "message": "new row violates row-level security policy for table \"exercises\""}
```

## Causa
Las políticas de Row Level Security (RLS) están bloqueando la inserción de ejercicios. Esto puede ocurrir por:

1. **Usuario no autenticado**: `auth.uid()` es NULL
2. **Intento de crear ejercicio global**: `is_global = true` (solo admins pueden)
3. **created_by no coincide**: El campo `created_by` no es igual a `auth.uid()`

## Solución Rápida

### Opción 1: Actualizar Políticas RLS (Recomendado)

Ejecuta el script `scripts/supabase-update-rls.sql` en el SQL Editor de Supabase:

```bash
# Ve a Supabase Dashboard → SQL Editor
# Copia y pega el contenido de: scripts/supabase-update-rls.sql
# Click en "Run"
```

Este script:
- Elimina las políticas antiguas
- Crea políticas más permisivas
- Agrega constraint para validar created_by

### Opción 2: Verificar Autenticación

Asegúrate de que el usuario esté autenticado antes de crear ejercicios:

```javascript
// En tu código
const { user } = useAuth();

if (!user?.id) {
  Alert.alert('Error', 'Debes estar autenticado para crear ejercicios');
  return;
}

// Ahora sí puedes crear el ejercicio
await ExerciseService.createCustomExercise({
  name: exerciseName,
  description: exerciseDescription,
  muscle_group: muscleGroup,
  equipment: equipment,
  userId: user.id  // ← IMPORTANTE: pasar el userId
});
```

### Opción 3: Deshabilitar RLS Temporalmente (Solo para Testing)

**⚠️ NO RECOMENDADO PARA PRODUCCIÓN**

```sql
-- En Supabase SQL Editor
ALTER TABLE public.exercises DISABLE ROW LEVEL SECURITY;
```

Para volver a habilitarlo:
```sql
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
```

## Verificación

Después de aplicar la solución, verifica que funcione:

### 1. Verificar Políticas Activas
```sql
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'exercises';
```

Deberías ver 5 políticas:
- ✅ Ejercicios globales son visibles para todos (SELECT)
- ✅ Los usuarios pueden ver sus propios ejercicios (SELECT)
- ✅ Los usuarios pueden crear ejercicios personalizados (INSERT)
- ✅ Los usuarios pueden actualizar sus ejercicios (UPDATE)
- ✅ Los usuarios pueden eliminar sus ejercicios (DELETE)

### 2. Probar Inserción Manual
```sql
-- Reemplaza 'tu-user-id' con tu UUID real de auth.users
INSERT INTO public.exercises (
  name, 
  muscle_group, 
  equipment, 
  created_by, 
  is_global
) VALUES (
  'Ejercicio de prueba',
  'pecho',
  'mancuernas',
  'tu-user-id',  -- Obtener de: SELECT id FROM auth.users LIMIT 1;
  false
);
```

Si funciona, el problema estaba en las políticas RLS.

### 3. Probar desde la App
```javascript
// En CreateRoutineScreen o AddExerciseScreen
try {
  const newExercise = await ExerciseService.createCustomExercise({
    name: 'Press personalizado',
    muscle_group: 'pecho',
    equipment: 'barra',
    userId: user.id
  });
  console.log('Ejercicio creado:', newExercise);
} catch (error) {
  console.error('Error:', error);
}
```

## Debug Adicional

### Ver Usuario Actual
```sql
SELECT auth.uid() as current_user_id;
```

Si retorna NULL, el usuario no está autenticado.

### Ver Token JWT
En la app, verifica el token:
```javascript
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
console.log('User ID:', session?.user?.id);
```

### Ver Logs de Supabase
Ve a Supabase Dashboard → Logs → API Logs para ver detalles del error.

## Políticas RLS Actualizadas

### INSERT Policy (La más importante para este error)
```sql
CREATE POLICY "Los usuarios pueden crear ejercicios personalizados"
  ON public.exercises FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL           -- Usuario autenticado
    AND is_global = false            -- Solo ejercicios personalizados
    AND (created_by = auth.uid() OR created_by IS NULL)  -- Coincide o NULL
  );
```

Esta política permite:
- ✅ Crear ejercicios si estás autenticado
- ✅ Crear ejercicios con `is_global = false`
- ✅ Crear ejercicios donde `created_by` coincide con tu user ID

Esta política NO permite:
- ❌ Crear ejercicios globales (`is_global = true`)
- ❌ Crear ejercicios sin autenticación
- ❌ Crear ejercicios para otro usuario

## Checklist de Verificación

- [ ] Usuario autenticado (`user.id` no es null)
- [ ] `is_global = false` en el objeto de ejercicio
- [ ] `created_by` coincide con `auth.uid()`
- [ ] Políticas RLS actualizadas en Supabase
- [ ] RLS habilitado en la tabla exercises
- [ ] Token de Supabase válido (no expirado)

## Si Aún No Funciona

1. **Verifica las credenciales de Supabase** en `.env`:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   ```

2. **Reinicia la app** después de cambiar políticas RLS

3. **Cierra sesión y vuelve a iniciar** para refrescar el token

4. **Verifica la tabla en Supabase Table Editor** para ver si hay ejercicios

5. **Contacta si el problema persiste** con los logs completos

---

**✅ Con las políticas RLS actualizadas, deberías poder crear ejercicios personalizados sin problemas.**
