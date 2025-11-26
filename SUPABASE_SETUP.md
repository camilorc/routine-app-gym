# Configuración de Supabase para Strongo

## 📋 Requisitos previos

- Cuenta en [Supabase](https://supabase.com)
- Proyecto creado en Supabase
- Credenciales del proyecto (URL y anon key)

## 🚀 Pasos de configuración

### 1. Crear proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta (si no la tienes)
2. Crea un nuevo proyecto
3. Guarda las credenciales que aparecen:
   - `Project URL`
   - `anon/public key`

### 2. Configurar variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

2. Asegúrate de que `.env` esté en tu `.gitignore`:

```gitignore
.env
```

### 3. Ejecutar el schema de la base de datos

**Archivo único: `scripts/supabase-schema.sql`**

Este archivo contiene TODO lo necesario:
- Creación de tablas
- Índices y constraints
- Políticas RLS (Row Level Security)
- Triggers

**Pasos:**

1. Ve al panel de Supabase de tu proyecto
2. Navega a **SQL Editor** en el menú lateral
3. Copia todo el contenido de `scripts/supabase-schema.sql`
4. Pégalo en el editor SQL
5. Haz clic en **Run** (esquina inferior derecha)
6. Verifica que todas las tablas se crearon correctamente:
   - `exercises`
   - `routines`
   - `routine_exercises`
   - `exercise_sets`
   - `routine_assignments`

### 4. Insertar ejercicios iniciales (seed)

**Archivo: `scripts/supabase-seed.sql`**

1. En el **SQL Editor** de Supabase
2. Crea una **nueva consulta** (New query)
3. Copia todo el contenido de `scripts/supabase-seed.sql`
4. Pégalo en el editor SQL
5. Haz clic en **Run**
6. Verifica la inserción ejecutando:

```sql
SELECT name, muscle_group, equipment 
FROM public.exercises 
WHERE is_global = true 
ORDER BY muscle_group, name;
```

Deberías ver aproximadamente 50 ejercicios globales.

### 5. Verificar Row Level Security (RLS)

Las políticas de RLS ya están configuradas en el schema. Para verificar:

1. Ve a **Authentication** > **Policies**
2. Verifica que cada tabla tenga políticas activas
3. Las políticas configuradas son:
   - **exercises**: Los usuarios ven ejercicios globales y sus propios ejercicios personalizados
   - **routines**: Los usuarios solo ven sus propias rutinas (o públicas)
   - **routine_exercises**: Solo accesibles a través de las rutinas del usuario
   - **exercise_sets**: Solo accesibles a través de las rutinas del usuario
   - **routine_assignments**: Los usuarios ven asignaciones que hicieron o que les hicieron

### 6. Configurar autenticación (opcional)

Si quieres habilitar autenticación con proveedores externos:

1. Ve a **Authentication** > **Providers**
2. Configura los proveedores que quieras (Google, GitHub, etc.)
3. Actualiza el código en `auth/supabaseClient.js` si es necesario

### 7. Probar la conexión

1. Actualiza las credenciales en `auth/supabaseClient.js`:

```javascript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

2. Ejecuta la app:

```bash
npm start
```

3. Registra un usuario nuevo desde la app
4. Crea una rutina de prueba
5. Ve a **Table Editor** en Supabase y verifica que:
   - El usuario aparece en la tabla `auth.users`
   - La rutina aparece en `public.routines`
   - Los ejercicios aparecen en `public.routine_exercises`
   - Las series aparecen en `public.exercise_sets`

## 🔍 Verificación de tablas

Ejecuta estas consultas en el SQL Editor para verificar la estructura:

```sql
-- Ver todas las tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver ejercicios globales
SELECT COUNT(*) as total_ejercicios 
FROM public.exercises 
WHERE is_global = true;

-- Ver índices creados
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;

-- Ver políticas RLS activas
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 📊 Estructura de datos

### Relaciones principales:

```
users (Supabase Auth)
  ↓
routines (user_id)
  ↓
routine_exercises (routine_id)
  ↓
exercise_sets (routine_exercise_id)

exercises (global o por usuario)
  ↑
routine_exercises (exercise_id) - relación opcional
```

### Flujo de creación de rutina:

1. Usuario crea rutina → INSERT en `routines`
2. Agrega ejercicios → INSERT en `routine_exercises`
3. Configura series → INSERT en `exercise_sets`

### Flujo de consulta de rutina:

```sql
SELECT 
  r.*,
  re.id as routine_exercise_id,
  re.order_index,
  re.notes,
  e.*,
  es.id as set_id,
  es.set_number,
  es.reps,
  es.weight_kg,
  es.rir,
  es.rest_seconds
FROM routines r
LEFT JOIN routine_exercises re ON re.routine_id = r.id
LEFT JOIN exercises e ON e.id = re.exercise_id
LEFT JOIN exercise_sets es ON es.routine_exercise_id = re.id
WHERE r.user_id = 'user-uuid'
ORDER BY r.created_at DESC, re.order_index, es.set_number;
```

## 🛠️ Troubleshooting

### Error: "relation does not exist"
- Verifica que ejecutaste el schema SQL completo
- Revisa que no haya errores en el SQL Editor

### Error: "new row violates row-level security policy"
- Verifica que el usuario esté autenticado (`auth.uid()` no es null)
- Revisa las políticas RLS en la tabla correspondiente

### No aparecen ejercicios globales
- Verifica que ejecutaste el seed SQL
- Ejecuta: `SELECT COUNT(*) FROM exercises WHERE is_global = true;`
- Debe retornar más de 0

### Error de conexión desde la app
- Verifica que las variables de entorno estén correctas
- Verifica que la URL tenga `https://`
- Verifica que la anon key sea la correcta (empieza con `eyJ`)

## 📝 Siguientes pasos

Una vez configurada la base de datos:

1. ✅ Las rutinas se guardarán en Supabase automáticamente
2. ✅ Los ejercicios se cargarán desde Supabase
3. ✅ La búsqueda de ejercicios funcionará con `ExerciseService.searchExercises()`
4. ✅ Los datos persisten entre sesiones y dispositivos

## 🔒 Seguridad

- ✅ RLS habilitado en todas las tablas
- ✅ Los usuarios solo pueden ver sus propios datos
- ✅ Los ejercicios globales son de solo lectura para usuarios
- ✅ Las claves están en variables de entorno (no en el código)
- ⚠️ Nunca expongas la `service_role` key en el cliente

## 📚 Recursos adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Row Level Security en PostgreSQL](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
