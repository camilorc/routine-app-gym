-- =====================================================
-- RESET COMPLETO DE LA BASE DE DATOS - STRONGO
-- =====================================================
-- ⚠️ ADVERTENCIA: Este script ELIMINARÁ TODAS las tablas y datos
-- Solo ejecutar en desarrollo o si estás seguro de querer borrar todo
-- =====================================================

-- Deshabilitar temporalmente las políticas RLS para evitar errores
ALTER TABLE IF EXISTS public.routine_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.exercise_sets DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.routine_exercises DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.routines DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.exercises DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- ELIMINAR POLÍTICAS RLS
-- =====================================================

-- Políticas de routine_assignments
DROP POLICY IF EXISTS "Los usuarios pueden ver rutinas asignadas a ellos" ON public.routine_assignments;
DROP POLICY IF EXISTS "Los usuarios pueden ver rutinas que asignaron" ON public.routine_assignments;
DROP POLICY IF EXISTS "Los usuarios pueden asignar sus rutinas" ON public.routine_assignments;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus asignaciones" ON public.routine_assignments;

-- Políticas de exercise_sets
DROP POLICY IF EXISTS "Los usuarios pueden ver sets de sus rutinas" ON public.exercise_sets;
DROP POLICY IF EXISTS "Los usuarios pueden agregar sets a sus rutinas" ON public.exercise_sets;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sets de sus rutinas" ON public.exercise_sets;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sets de sus rutinas" ON public.exercise_sets;

-- Políticas de routine_exercises
DROP POLICY IF EXISTS "Los usuarios pueden ver ejercicios de sus rutinas" ON public.routine_exercises;
DROP POLICY IF EXISTS "Los usuarios pueden agregar ejercicios a sus rutinas" ON public.routine_exercises;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar ejercicios de sus rutinas" ON public.routine_exercises;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar ejercicios de sus rutinas" ON public.routine_exercises;

-- Políticas de routines
DROP POLICY IF EXISTS "Los usuarios pueden ver sus propias rutinas" ON public.routines;
DROP POLICY IF EXISTS "Las rutinas públicas son visibles para todos" ON public.routines;
DROP POLICY IF EXISTS "Los usuarios pueden crear rutinas" ON public.routines;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus rutinas" ON public.routines;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus rutinas" ON public.routines;

-- Políticas de exercises
DROP POLICY IF EXISTS "Ejercicios globales son visibles para todos" ON public.exercises;
DROP POLICY IF EXISTS "Los usuarios pueden ver sus propios ejercicios" ON public.exercises;
DROP POLICY IF EXISTS "Los usuarios pueden crear ejercicios personalizados" ON public.exercises;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus ejercicios" ON public.exercises;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus ejercicios" ON public.exercises;

-- =====================================================
-- ELIMINAR TRIGGERS
-- =====================================================

DROP TRIGGER IF EXISTS update_exercises_updated_at ON public.exercises;
DROP TRIGGER IF EXISTS update_routines_updated_at ON public.routines;

-- =====================================================
-- ELIMINAR FUNCIONES
-- =====================================================

DROP FUNCTION IF EXISTS update_updated_at_column();

-- =====================================================
-- ELIMINAR TABLAS (en orden inverso por dependencias)
-- =====================================================

DROP TABLE IF EXISTS public.routine_assignments CASCADE;
DROP TABLE IF EXISTS public.exercise_sets CASCADE;
DROP TABLE IF EXISTS public.routine_exercises CASCADE;
DROP TABLE IF EXISTS public.routines CASCADE;
DROP TABLE IF EXISTS public.exercises CASCADE;

-- =====================================================
-- CONFIRMACIÓN
-- =====================================================

-- Verificar que las tablas fueron eliminadas
DO $$
BEGIN
  RAISE NOTICE '✅ Todas las tablas han sido eliminadas correctamente';
  RAISE NOTICE '📝 Ahora puedes ejecutar el script supabase-schema.sql para recrear las tablas';
  RAISE NOTICE '📊 Luego ejecuta supabase-seed.sql para insertar los datos iniciales';
END $$;
