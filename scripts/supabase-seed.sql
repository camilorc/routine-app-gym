-- =====================================================
-- SEED DATA PARA STRONGO - EJERCICIOS GLOBALES
-- =====================================================
-- Este script inserta ejercicios básicos globales
-- Ejecutar después de crear el schema

-- =====================================================
-- LIMPIAR DATOS EXISTENTES
-- =====================================================
-- CUIDADO: Esto eliminará TODOS los ejercicios de la base de datos
-- Solo para pruebas - elimina todo antes de insertar

DELETE FROM public.exercises;

-- =====================================================
-- EJERCICIOS DE PECHO
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Press de banca plano', 'Ejercicio fundamental para desarrollar el pecho', 'pecho', ARRAY['triceps', 'hombros'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Acuéstate en el banco plano', 'Agarra la barra con un agarre ligeramente más ancho que los hombros', 'Baja la barra controladamente hasta el pecho', 'Empuja hacia arriba hasta extender los brazos']),
('Press de banca inclinado', 'Enfatiza la parte superior del pecho', 'pecho', ARRAY['triceps', 'hombros'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Ajusta el banco a 30-45 grados', 'Agarra la barra con agarre medio', 'Baja hasta la parte superior del pecho', 'Empuja hacia arriba']),
('Aperturas con mancuernas', 'Aislamiento para el pecho', 'pecho', ARRAY[]::TEXT[], 'Mancuernas 15kg', 'mancuernas', 'intermediate', true, ARRAY['Acuéstate con mancuernas sobre el pecho', 'Abre los brazos en arco amplio', 'Mantén una ligera flexión en los codos', 'Regresa a la posición inicial sintiendo el estiramiento']),
('Flexiones', 'Ejercicio básico de peso corporal para pecho', 'pecho', ARRAY['triceps', 'hombros', 'core'], 'Ninguno / Peso corporal', 'peso_corporal', 'beginner', true, ARRAY['Colócate en posición de plancha', 'Manos ligeramente más anchas que los hombros', 'Baja el pecho hasta casi tocar el suelo', 'Empuja hacia arriba']),
('Press en máquina', 'Variante segura del press de banca', 'pecho', ARRAY['triceps', 'hombros'], 'Máquina de pecho', 'maquina', 'beginner', true, ARRAY['Ajusta el asiento a la altura adecuada', 'Agarra las manijas', 'Empuja hacia adelante', 'Regresa controladamente']);

-- =====================================================
-- EJERCICIOS DE ESPALDA
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Dominadas', 'Ejercicio compuesto para toda la espalda', 'espalda', ARRAY['biceps', 'antebrazos'], 'Ninguno / Peso corporal', 'peso_corporal', 'intermediate', true, ARRAY['Cuelga de la barra con agarre prono', 'Manos ligeramente más anchas que los hombros', 'Tira hacia arriba hasta que el mentón pase la barra', 'Baja controladamente']),
('Remo con barra', 'Desarrollo general de la espalda media', 'espalda', ARRAY['biceps', 'core'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Inclínate hacia adelante con la espalda recta', 'Agarra la barra con agarre prono', 'Tira de la barra hacia el abdomen bajo', 'Mantén los codos cerca del cuerpo']),
('Jalón al pecho', 'Alternativa a las dominadas', 'espalda', ARRAY['biceps'], 'Máquina de dorsales', 'maquina', 'beginner', true, ARRAY['Siéntate en la máquina', 'Agarra la barra ancha', 'Tira hacia el pecho', 'Contrae los dorsales']),
('Remo en polea baja', 'Desarrollo de espalda media y baja', 'espalda', ARRAY['biceps', 'antebrazos'], 'Cable con agarre en V', 'cable', 'beginner', true, ARRAY['Siéntate en la máquina', 'Agarra el maneral', 'Tira hacia el abdomen', 'Mantén la espalda recta']),
('Peso muerto', 'Ejercicio compuesto fundamental', 'espalda', ARRAY['isquiotibiales', 'gluteos', 'core'], 'Barra olímpica 20kg', 'barra', 'advanced', true, ARRAY['Coloca los pies al ancho de hombros', 'Agarra la barra', 'Mantén la espalda recta', 'Levanta extendiendo caderas y rodillas', 'Baja controladamente']);

-- =====================================================
-- EJERCICIOS DE HOMBROS
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Press militar', 'Ejercicio fundamental para hombros', 'hombros', ARRAY['triceps', 'core'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['De pie con la barra a la altura de los hombros', 'Empuja hacia arriba sobre la cabeza', 'Baja controladamente', 'Mantén el core activado']),
('Elevaciones laterales', 'Aislamiento para deltoides laterales', 'hombros', ARRAY[]::TEXT[], 'Mancuernas 15kg', 'mancuernas', 'beginner', true, ARRAY['De pie con mancuernas a los lados', 'Levanta los brazos hacia los lados', 'Hasta la altura de los hombros', 'Baja controladamente']),
('Press con mancuernas sentado', 'Variante del press militar', 'hombros', ARRAY['triceps'], 'Mancuernas 15kg', 'mancuernas', 'intermediate', true, ARRAY['Siéntate con respaldo', 'Mancuernas a la altura de los hombros', 'Empuja hacia arriba', 'Baja controladamente']),
('Elevaciones frontales', 'Aislamiento para deltoides frontales', 'hombros', ARRAY[]::TEXT[], 'Mancuernas 15kg', 'mancuernas', 'beginner', true, ARRAY['De pie con mancuernas al frente', 'Levanta hacia adelante', 'Hasta la altura de los hombros', 'Alterna brazos o simultáneamente']),
('Face pulls', 'Para deltoides posteriores y salud del hombro', 'hombros', ARRAY['espalda'], 'Cable con agarre en V', 'cable', 'intermediate', true, ARRAY['Ajusta la polea alta', 'Agarra la cuerda', 'Tira hacia la cara', 'Separa las manos al final del movimiento']);

-- =====================================================
-- EJERCICIOS DE BÍCEPS
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Curl con barra', 'Ejercicio básico para bíceps', 'biceps', ARRAY['antebrazos'], 'Barra olímpica 20kg', 'barra', 'beginner', true, ARRAY['De pie con barra en las manos', 'Codos pegados al cuerpo', 'Curl hacia los hombros', 'Baja controladamente']),
('Curl con mancuernas', 'Permite mayor rango de movimiento', 'biceps', ARRAY['antebrazos'], 'Mancuernas 15kg', 'mancuernas', 'beginner', true, ARRAY['De pie o sentado', 'Curl hacia los hombros', 'Puedes alternar o simultáneo', 'Mantén los codos fijos']),
('Curl martillo', 'Enfatiza braquial y braquiorradial', 'biceps', ARRAY['antebrazos'], 'Mancuernas 15kg', 'mancuernas', 'beginner', true, ARRAY['Agarre neutro (palmas enfrentadas)', 'Curl hacia los hombros', 'Mantén el agarre neutro durante todo el movimiento']),
('Curl en predicador', 'Aislamiento estricto de bíceps', 'biceps', ARRAY[]::TEXT[], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Apoya los brazos en el banco predicador', 'Curl controlado', 'No despegues los codos', 'Baja hasta casi extender']),
('Curl en polea baja', 'Tensión constante en el bíceps', 'biceps', ARRAY['antebrazos'], 'Cable con agarre en V', 'cable', 'beginner', true, ARRAY['Agarra la barra de la polea baja', 'Curl hacia los hombros', 'Mantén los codos fijos', 'Controla la bajada']);

-- =====================================================
-- EJERCICIOS DE TRÍCEPS
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Press francés', 'Ejercicio de aislamiento para tríceps', 'triceps', ARRAY[]::TEXT[], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Acostado en banco plano', 'Barra sobre la frente', 'Extiende los brazos sin mover los codos', 'Baja controladamente hacia la frente']),
('Fondos en paralelas', 'Ejercicio compuesto para tríceps', 'triceps', ARRAY['pecho', 'hombros'], 'Ninguno / Peso corporal', 'peso_corporal', 'intermediate', true, ARRAY['Agarra las paralelas', 'Cuerpo ligeramente inclinado hacia adelante', 'Baja flexionando los codos', 'Empuja hacia arriba']),
('Extensiones en polea alta', 'Aislamiento con tensión constante', 'triceps', ARRAY[]::TEXT[], 'Cable con agarre en V', 'cable', 'beginner', true, ARRAY['Agarra la cuerda o barra en polea alta', 'Codos pegados al cuerpo', 'Extiende hacia abajo', 'Regresa controladamente']),
('Press cerrado', 'Variante del press de banca para tríceps', 'triceps', ARRAY['pecho'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Acostado en banco plano', 'Agarre estrecho en la barra', 'Baja hacia el pecho', 'Empuja hacia arriba manteniendo codos cerca']),
('Patada de tríceps', 'Aislamiento unilateral', 'triceps', ARRAY[]::TEXT[], 'Mancuernas 15kg', 'mancuernas', 'beginner', true, ARRAY['Inclínate hacia adelante', 'Codo fijo y pegado al cuerpo', 'Extiende el brazo hacia atrás', 'Contrae el tríceps']);

-- =====================================================
-- EJERCICIOS DE PIERNAS
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Sentadilla con barra', 'El rey de los ejercicios de pierna', 'cuadriceps', ARRAY['gluteos', 'isquiotibiales', 'core'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Barra sobre los hombros', 'Pies al ancho de hombros', 'Baja hasta paralelo o más', 'Empuja a través de los talones']),
('Prensa de piernas', 'Alternativa más segura a la sentadilla', 'cuadriceps', ARRAY['gluteos', 'isquiotibiales'], 'Máquina de piernas', 'maquina', 'beginner', true, ARRAY['Coloca los pies en la plataforma', 'Baja controladamente', 'Empuja hasta casi extender', 'No bloquees las rodillas']),
('Zancadas', 'Ejercicio unilateral para piernas', 'cuadriceps', ARRAY['gluteos', 'isquiotibiales'], 'Mancuernas 15kg', 'mancuernas', 'intermediate', true, ARRAY['Da un paso largo hacia adelante', 'Baja la rodilla trasera hacia el suelo', 'Empuja con la pierna delantera', 'Alterna las piernas']),
('Curl femoral', 'Aislamiento para isquiotibiales', 'isquiotibiales', ARRAY[]::TEXT[], 'Máquina de femorales', 'maquina', 'beginner', true, ARRAY['Acuéstate boca abajo en la máquina', 'Curl hacia los glúteos', 'Contrae los isquiotibiales', 'Baja controladamente']),
('Peso muerto rumano', 'Enfatiza isquiotibiales y glúteos', 'isquiotibiales', ARRAY['gluteos', 'espalda'], 'Barra olímpica 20kg', 'barra', 'intermediate', true, ARRAY['Barra frente a los muslos', 'Inclínate desde la cadera', 'Mantén las piernas casi rectas', 'Siente el estiramiento en isquiotibiales']),
('Elevaciones de gemelos', 'Para desarrollo de pantorrillas', 'gemelos', ARRAY[]::TEXT[], 'Máquina de gemelos', 'maquina', 'beginner', true, ARRAY['Colócate en la máquina', 'Empuja con los dedos del pie', 'Sube lo más alto posible', 'Baja hasta sentir estiramiento']),
('Extensiones de cuádriceps', 'Aislamiento de cuádriceps', 'cuadriceps', ARRAY[]::TEXT[], 'Máquina de extensiones', 'maquina', 'beginner', true, ARRAY['Siéntate en la máquina', 'Extiende las piernas', 'Contrae los cuádriceps arriba', 'Baja controladamente']);

-- =====================================================
-- EJERCICIOS DE CORE/ABDOMINALES
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Plancha', 'Ejercicio isométrico fundamental para core', 'core', ARRAY['abdominales'], 'Ninguno / Peso corporal', 'peso_corporal', 'beginner', true, ARRAY['Apoya antebrazos y pies', 'Mantén el cuerpo recto', 'Activa el core', 'Respira normalmente']),
('Crunch abdominal', 'Ejercicio básico para abdominales', 'abdominales', ARRAY[]::TEXT[], 'Ninguno / Peso corporal', 'peso_corporal', 'beginner', true, ARRAY['Acostado boca arriba', 'Manos detrás de la cabeza', 'Eleva el tronco sin jalar el cuello', 'Contrae los abdominales']),
('Elevación de piernas', 'Para abdominales inferiores', 'abdominales', ARRAY['core'], 'Ninguno / Peso corporal', 'peso_corporal', 'intermediate', true, ARRAY['Acostado o colgando', 'Eleva las piernas juntas', 'Mantén las piernas rectas', 'Baja controladamente']),
('Russian twist', 'Para oblicuos', 'core', ARRAY['abdominales'], 'Ninguno / Peso corporal', 'peso_corporal', 'intermediate', true, ARRAY['Sentado con piernas elevadas', 'Gira el tronco a ambos lados', 'Puedes usar peso adicional', 'Mantén el balance']),
('Mountain climbers', 'Ejercicio dinámico de core', 'core', ARRAY['cardio'], 'Ninguno / Peso corporal', 'peso_corporal', 'intermediate', true, ARRAY['Posición de plancha', 'Lleva rodillas al pecho alternadas', 'Movimiento rápido', 'Mantén la cadera baja']);

-- =====================================================
-- EJERCICIOS DE CARDIO
-- =====================================================
INSERT INTO public.exercises (name, description, muscle_group, secondary_muscles, equipment_text, equipment_category, difficulty, is_global, instructions) VALUES
('Burpees', 'Ejercicio completo de cardio', 'cardio', ARRAY['fullbody'], 'Ninguno / Peso corporal', 'peso_corporal', 'intermediate', true, ARRAY['De pie a cuclillas', 'Apoya las manos y salta atrás', 'Flexión opcional', 'Salta hacia adelante y arriba']),
('Jumping jacks', 'Calentamiento cardio básico', 'cardio', ARRAY[]::TEXT[], 'Ninguno / Peso corporal', 'peso_corporal', 'beginner', true, ARRAY['Salta separando piernas y brazos', 'Regresa a posición inicial', 'Mantén ritmo constante']),
('Correr en el lugar', 'Cardio básico sin desplazamiento', 'cardio', ARRAY[]::TEXT[], 'Ninguno / Peso corporal', 'peso_corporal', 'beginner', true, ARRAY['Corre levantando rodillas', 'Mantén los brazos en movimiento', 'Controla la intensidad']),
('Saltos de caja', 'Cardio explosivo', 'cardio', ARRAY['cuadriceps', 'gluteos'], 'Caja o plataforma', 'otro', 'intermediate', true, ARRAY['Salta sobre una caja o plataforma', 'Aterriza suavemente', 'Baja con control', 'Repetir']);

-- =====================================================
-- VERIFICAR INSERCIÓN
-- =====================================================
-- Para verificar que se insertaron correctamente:
-- SELECT name, muscle_group, equipment_text, equipment_category FROM public.exercises WHERE is_global = true ORDER BY muscle_group, name;
