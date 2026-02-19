-- =====================================================
-- MIGRACIÓN: Crear tabla muscle_groups
-- =====================================================
-- Esta migración crea la tabla de grupos musculares y migra los datos existentes

-- 1. Crear la tabla muscle_groups
CREATE TABLE IF NOT EXISTS public.muscle_groups (
  id VARCHAR(50) PRIMARY KEY,
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT,  -- 'upper', 'lower', 'core', 'other'
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insertar los grupos musculares iniciales
INSERT INTO public.muscle_groups (id, display_name, category, sort_order) VALUES
  ('piernas', 'Piernas', 'lower', 1),
  ('gluteos', 'Glúteos', 'lower', 2),
  ('espalda', 'Espalda', 'upper', 3),
  ('pecho', 'Pecho', 'upper', 4),
  ('hombros', 'Hombros', 'upper', 5),
  ('biceps', 'Bíceps', 'upper', 6),
  ('triceps', 'Tríceps', 'upper', 7),
  ('core', 'Core', 'core', 8),
  ('pantorrillas', 'Pantorrillas', 'lower', 9),
  ('antebrazos', 'Antebrazos', 'upper', 10),
  ('cuello', 'Cuello', 'upper', 11),
  ('otro', 'Otro', 'other', 12)
ON CONFLICT (id) DO NOTHING;

-- 3. PRIMERO eliminar el constraint antiguo de exercises
ALTER TABLE public.exercises 
  DROP CONSTRAINT IF EXISTS valid_muscle_group;

-- 4. Actualizar valores antiguos de muscle_group a los nuevos
UPDATE public.exercises 
SET muscle_group = 'core' 
WHERE muscle_group = 'abdominales';

UPDATE public.exercises 
SET muscle_group = 'piernas' 
WHERE muscle_group IN ('cuadriceps', 'isquiotibiales');

UPDATE public.exercises 
SET muscle_group = 'pantorrillas' 
WHERE muscle_group = 'gemelos';

UPDATE public.exercises 
SET muscle_group = 'otro' 
WHERE muscle_group IN ('cardio', 'fullbody');

-- 5. Agregar foreign key constraint
ALTER TABLE public.exercises 
  ADD CONSTRAINT fk_muscle_group 
  FOREIGN KEY (muscle_group) 
  REFERENCES public.muscle_groups(id)
  ON DELETE RESTRICT;

-- 6. Crear índice para mejorar performance
CREATE INDEX IF NOT EXISTS idx_muscle_groups_category 
  ON public.muscle_groups(category);

-- 7. Habilitar RLS en muscle_groups
ALTER TABLE public.muscle_groups ENABLE ROW LEVEL SECURITY;

-- 8. Política RLS: Todos pueden leer los grupos musculares
CREATE POLICY "Los grupos musculares son públicos"
  ON public.muscle_groups FOR SELECT
  USING (true);

-- 9. Comentarios de documentación
COMMENT ON TABLE public.muscle_groups IS 'Catálogo de grupos musculares disponibles en la aplicación';
COMMENT ON COLUMN public.muscle_groups.id IS 'Identificador único del grupo muscular (usado en código)';
COMMENT ON COLUMN public.muscle_groups.display_name IS 'Nombre visible para el usuario';
COMMENT ON COLUMN public.muscle_groups.category IS 'Categoría: upper (tren superior), lower (tren inferior), core, other';
COMMENT ON COLUMN public.muscle_groups.sort_order IS 'Orden de presentación en la UI';
