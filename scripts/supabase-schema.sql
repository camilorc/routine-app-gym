-- =====================================================
-- SCHEMA DE SUPABASE PARA STRONGO
-- =====================================================
-- Este script crea todas las tablas necesarias para la aplicación
-- Ejecutar en el SQL Editor de Supabase Dashboard

-- =====================================================
-- 1. TABLA: exercises
-- =====================================================
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  muscle_group TEXT NOT NULL,
  secondary_muscles TEXT[] DEFAULT ARRAY[]::TEXT[],
  equipment_text VARCHAR(100), -- Texto libre descriptivo del equipamiento (ej: "Barra olímpica 20kg")
  equipment_category VARCHAR(50), -- Categoría general (barra, mancuernas, peso_corporal, etc.)
  difficulty TEXT DEFAULT 'intermediate',
  video_url TEXT,
  image_url TEXT,
  instructions TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_global BOOLEAN DEFAULT false,
  based_on_exercise_id UUID REFERENCES public.exercises(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_muscle_group CHECK (muscle_group IN (
    'pecho', 'espalda', 'hombros', 'biceps', 'triceps', 
    'antebrazos', 'cuadriceps', 'isquiotibiales', 'gluteos', 
    'gemelos', 'abdominales', 'core', 'cardio', 'fullbody'
  )),
  -- equipment es texto libre sin validación para mayor flexibilidad
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  CONSTRAINT user_exercises_must_have_creator CHECK (is_global = true OR created_by IS NOT NULL)
);

-- Índices para exercises
CREATE INDEX idx_exercises_muscle_group ON public.exercises(muscle_group);
CREATE INDEX idx_exercises_equipment_category ON public.exercises(equipment_category);
CREATE INDEX idx_exercises_is_global ON public.exercises(is_global);
CREATE INDEX idx_exercises_created_by ON public.exercises(created_by);
CREATE INDEX idx_exercises_name ON public.exercises(name);

-- Trigger para updated_at en exercises
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. TABLA: routines
-- =====================================================
CREATE TABLE IF NOT EXISTS public.routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  is_template BOOLEAN DEFAULT false,
  cloned_from_routine_id UUID REFERENCES public.routines(id) ON DELETE SET NULL,
  is_modified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para routines
CREATE INDEX idx_routines_user_id ON public.routines(user_id);
CREATE INDEX idx_routines_is_public ON public.routines(is_public);
CREATE INDEX idx_routines_is_template ON public.routines(is_template);
CREATE INDEX idx_routines_cloned_from ON public.routines(cloned_from_routine_id);

-- Trigger para updated_at en routines
CREATE TRIGGER update_routines_updated_at
  BEFORE UPDATE ON public.routines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. TABLA: routine_exercises
-- =====================================================
CREATE TABLE IF NOT EXISTS public.routine_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES public.routines(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE SET NULL,
  order_index INTEGER NOT NULL,
  notes TEXT,
  custom_exercise_name TEXT,
  custom_exercise_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_order_index CHECK (order_index >= 0),
  CONSTRAINT has_exercise CHECK (exercise_id IS NOT NULL OR custom_exercise_name IS NOT NULL)
);

-- Índices para routine_exercises
CREATE INDEX idx_routine_exercises_routine_id ON public.routine_exercises(routine_id);
CREATE INDEX idx_routine_exercises_exercise_id ON public.routine_exercises(exercise_id);
CREATE INDEX idx_routine_exercises_order ON public.routine_exercises(routine_id, order_index);

-- =====================================================
-- 4. TABLA: exercise_sets
-- =====================================================
-- Representa cada serie individual de un ejercicio en una rutina
-- Una rutina tiene ejercicios (routine_exercises), y cada ejercicio tiene múltiples series (exercise_sets)
CREATE TABLE IF NOT EXISTS public.exercise_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_exercise_id UUID NOT NULL REFERENCES public.routine_exercises(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL, -- Número de la serie (1, 2, 3, etc.)
  reps TEXT, -- Repeticiones como texto para permitir rangos (ej: "8-12", "10", "AMRAP")
  weight_kg TEXT, -- Peso como texto para permitir notaciones (ej: "20", "BW", "BW+10")
  rir TEXT, -- RIR (Reps In Reserve) como texto (ej: "2", "1-2", "0")
  rest_minutes INTEGER, -- Minutos de descanso (ej: 1, 2, 3)
  rest_seconds INTEGER, -- Segundos de descanso (ej: 0, 15, 30, 45)
  completed BOOLEAN DEFAULT false,
  notes TEXT, -- Notas adicionales sobre la serie
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_set_number CHECK (set_number > 0),
  CONSTRAINT valid_rest_minutes CHECK (rest_minutes IS NULL OR rest_minutes >= 0),
  CONSTRAINT valid_rest_seconds CHECK (rest_seconds IS NULL OR (rest_seconds >= 0 AND rest_seconds < 60))
);

-- Índices para exercise_sets
CREATE INDEX idx_exercise_sets_routine_exercise_id ON public.exercise_sets(routine_exercise_id);
CREATE INDEX idx_exercise_sets_set_number ON public.exercise_sets(routine_exercise_id, set_number);

-- =====================================================
-- 5. TABLA: routine_assignments
-- =====================================================
CREATE TABLE IF NOT EXISTS public.routine_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES public.routines(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_to UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  notes TEXT,
  
  CONSTRAINT different_users CHECK (assigned_by != assigned_to)
);

-- Índices para routine_assignments
CREATE INDEX idx_routine_assignments_assigned_to ON public.routine_assignments(assigned_to);
CREATE INDEX idx_routine_assignments_assigned_by ON public.routine_assignments(assigned_by);
CREATE INDEX idx_routine_assignments_routine_id ON public.routine_assignments(routine_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_assignments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS RLS: exercises
-- =====================================================

-- Los ejercicios globales son visibles para todos
CREATE POLICY "Ejercicios globales son visibles para todos"
  ON public.exercises FOR SELECT
  USING (is_global = true);

-- Los usuarios pueden ver sus propios ejercicios personalizados
CREATE POLICY "Los usuarios pueden ver sus propios ejercicios"
  ON public.exercises FOR SELECT
  USING (auth.uid() = created_by);

-- Los usuarios pueden crear sus propios ejercicios (verificar que is_global sea false Y que created_by coincida)
CREATE POLICY "Los usuarios pueden crear ejercicios personalizados"
  ON public.exercises FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND is_global = false 
    AND (created_by = auth.uid() OR created_by IS NULL)
  );

-- Los usuarios pueden actualizar sus propios ejercicios
CREATE POLICY "Los usuarios pueden actualizar sus ejercicios"
  ON public.exercises FOR UPDATE
  USING (auth.uid() = created_by AND is_global = false)
  WITH CHECK (auth.uid() = created_by AND is_global = false);

-- Los usuarios pueden eliminar sus propios ejercicios
CREATE POLICY "Los usuarios pueden eliminar sus ejercicios"
  ON public.exercises FOR DELETE
  USING (auth.uid() = created_by);

-- =====================================================
-- POLÍTICAS RLS: routines
-- =====================================================

-- Los usuarios pueden ver sus propias rutinas
CREATE POLICY "Los usuarios pueden ver sus propias rutinas"
  ON public.routines FOR SELECT
  USING (auth.uid() = user_id);

-- Los usuarios pueden ver rutinas públicas
CREATE POLICY "Las rutinas públicas son visibles para todos"
  ON public.routines FOR SELECT
  USING (is_public = true);

-- Los usuarios pueden crear sus propias rutinas
CREATE POLICY "Los usuarios pueden crear rutinas"
  ON public.routines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden actualizar sus propias rutinas
CREATE POLICY "Los usuarios pueden actualizar sus rutinas"
  ON public.routines FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden eliminar sus propias rutinas
CREATE POLICY "Los usuarios pueden eliminar sus rutinas"
  ON public.routines FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- POLÍTICAS RLS: routine_exercises
-- =====================================================

-- Los usuarios pueden ver ejercicios de sus propias rutinas
CREATE POLICY "Los usuarios pueden ver ejercicios de sus rutinas"
  ON public.routine_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.routines
      WHERE routines.id = routine_exercises.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- Los usuarios pueden agregar ejercicios a sus rutinas
CREATE POLICY "Los usuarios pueden agregar ejercicios a sus rutinas"
  ON public.routine_exercises FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.routines
      WHERE routines.id = routine_exercises.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- Los usuarios pueden actualizar ejercicios de sus rutinas
CREATE POLICY "Los usuarios pueden actualizar ejercicios de sus rutinas"
  ON public.routine_exercises FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.routines
      WHERE routines.id = routine_exercises.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- Los usuarios pueden eliminar ejercicios de sus rutinas
CREATE POLICY "Los usuarios pueden eliminar ejercicios de sus rutinas"
  ON public.routine_exercises FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.routines
      WHERE routines.id = routine_exercises.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- =====================================================
-- POLÍTICAS RLS: exercise_sets
-- =====================================================

-- Los usuarios pueden ver sets de ejercicios de sus rutinas
CREATE POLICY "Los usuarios pueden ver sets de sus rutinas"
  ON public.exercise_sets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.routine_exercises re
      JOIN public.routines r ON r.id = re.routine_id
      WHERE re.id = exercise_sets.routine_exercise_id
      AND r.user_id = auth.uid()
    )
  );

-- Los usuarios pueden agregar sets a ejercicios de sus rutinas
CREATE POLICY "Los usuarios pueden agregar sets a sus rutinas"
  ON public.exercise_sets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.routine_exercises re
      JOIN public.routines r ON r.id = re.routine_id
      WHERE re.id = exercise_sets.routine_exercise_id
      AND r.user_id = auth.uid()
    )
  );

-- Los usuarios pueden actualizar sets de sus rutinas
CREATE POLICY "Los usuarios pueden actualizar sets de sus rutinas"
  ON public.exercise_sets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.routine_exercises re
      JOIN public.routines r ON r.id = re.routine_id
      WHERE re.id = exercise_sets.routine_exercise_id
      AND r.user_id = auth.uid()
    )
  );

-- Los usuarios pueden eliminar sets de sus rutinas
CREATE POLICY "Los usuarios pueden eliminar sets de sus rutinas"
  ON public.exercise_sets FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.routine_exercises re
      JOIN public.routines r ON r.id = re.routine_id
      WHERE re.id = exercise_sets.routine_exercise_id
      AND r.user_id = auth.uid()
    )
  );

-- =====================================================
-- POLÍTICAS RLS: routine_assignments
-- =====================================================

-- Los usuarios pueden ver asignaciones que les hicieron
CREATE POLICY "Los usuarios pueden ver rutinas asignadas a ellos"
  ON public.routine_assignments FOR SELECT
  USING (auth.uid() = assigned_to);

-- Los usuarios pueden ver asignaciones que hicieron
CREATE POLICY "Los usuarios pueden ver rutinas que asignaron"
  ON public.routine_assignments FOR SELECT
  USING (auth.uid() = assigned_by);

-- Los usuarios pueden crear asignaciones de sus propias rutinas
CREATE POLICY "Los usuarios pueden asignar sus rutinas"
  ON public.routine_assignments FOR INSERT
  WITH CHECK (
    auth.uid() = assigned_by
    AND EXISTS (
      SELECT 1 FROM public.routines
      WHERE routines.id = routine_assignments.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- Los usuarios pueden eliminar asignaciones que crearon
CREATE POLICY "Los usuarios pueden eliminar sus asignaciones"
  ON public.routine_assignments FOR DELETE
  USING (auth.uid() = assigned_by);

-- =====================================================
-- COMENTARIOS EN LAS TABLAS
-- =====================================================

COMMENT ON TABLE public.exercises IS 'Ejercicios disponibles en la aplicación (globales y personalizados)';
COMMENT ON TABLE public.routines IS 'Rutinas de entrenamiento creadas por usuarios';
COMMENT ON TABLE public.routine_exercises IS 'Ejercicios incluidos en cada rutina';
COMMENT ON TABLE public.exercise_sets IS 'Series configuradas para cada ejercicio en una rutina';
COMMENT ON TABLE public.routine_assignments IS 'Asignaciones de rutinas entre entrenadores y alumnos';

-- =====================================================
-- FIN DEL SCHEMA
-- =====================================================
