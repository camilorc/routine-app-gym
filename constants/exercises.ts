import { Exercise } from '../types';

/**
 * Base de datos de ejercicios predefinidos
 * Esta es una lista temporal para desarrollo que será reemplazada por una base de datos real
 */

export const EXERCISE_DATABASE: Exercise[] = [
  // PECHO
  { id: 1, name: "Press de Banca", muscleGroup: "Pecho", equipment: "Barra" },
  { id: 2, name: "Press Inclinado con Barra", muscleGroup: "Pecho", equipment: "Barra" },
  { id: 3, name: "Press Declinado con Barra", muscleGroup: "Pecho", equipment: "Barra" },
  { id: 4, name: "Press con Mancuernas", muscleGroup: "Pecho", equipment: "Mancuernas" },
  { id: 5, name: "Press Inclinado con Mancuernas", muscleGroup: "Pecho", equipment: "Mancuernas" },
  { id: 6, name: "Aperturas con Mancuernas", muscleGroup: "Pecho", equipment: "Mancuernas" },
  { id: 7, name: "Aperturas Inclinadas", muscleGroup: "Pecho", equipment: "Mancuernas" },
  { id: 8, name: "Fondos en Paralelas", muscleGroup: "Pecho", equipment: "Peso Corporal" },
  { id: 9, name: "Peck Deck", muscleGroup: "Pecho", equipment: "Máquina" },
  { id: 10, name: "Pullover con Mancuerna", muscleGroup: "Pecho", equipment: "Mancuerna" },
  { id: 11, name: "Cruces en Polea", muscleGroup: "Pecho", equipment: "Polea" },
  { id: 12, name: "Press en Máquina", muscleGroup: "Pecho", equipment: "Máquina" },

  // ESPALDA
  { id: 13, name: "Dominadas", muscleGroup: "Espalda", equipment: "Peso Corporal" },
  { id: 14, name: "Dominadas Pronadas", muscleGroup: "Espalda", equipment: "Peso Corporal" },
  { id: 15, name: "Dominadas Supinas", muscleGroup: "Espalda", equipment: "Peso Corporal" },
  { id: 16, name: "Remo con Barra", muscleGroup: "Espalda", equipment: "Barra" },
  { id: 17, name: "Remo con Mancuerna", muscleGroup: "Espalda", equipment: "Mancuerna" },
  { id: 18, name: "Remo en Polea Baja", muscleGroup: "Espalda", equipment: "Polea" },
  { id: 19, name: "Jalón al Pecho", muscleGroup: "Espalda", equipment: "Polea" },
  { id: 20, name: "Jalón tras Nuca", muscleGroup: "Espalda", equipment: "Polea" },
  { id: 21, name: "Peso Muerto", muscleGroup: "Espalda", equipment: "Barra" },
  { id: 22, name: "Peso Muerto Rumano", muscleGroup: "Espalda", equipment: "Barra" },
  { id: 23, name: "Hiperextensiones", muscleGroup: "Espalda", equipment: "Peso Corporal" },
  { id: 24, name: "Pullover en Polea", muscleGroup: "Espalda", equipment: "Polea" },
  { id: 25, name: "Remo en Máquina", muscleGroup: "Espalda", equipment: "Máquina" },

  // HOMBROS
  { id: 26, name: "Press Militar", muscleGroup: "Hombros", equipment: "Barra" },
  { id: 27, name: "Press con Mancuernas Sentado", muscleGroup: "Hombros", equipment: "Mancuernas" },
  { id: 28, name: "Press Arnold", muscleGroup: "Hombros", equipment: "Mancuernas" },
  { id: 29, name: "Elevaciones Laterales", muscleGroup: "Hombros", equipment: "Mancuernas" },
  { id: 30, name: "Elevaciones Frontales", muscleGroup: "Hombros", equipment: "Mancuernas" },
  { id: 31, name: "Pájaros", muscleGroup: "Hombros", equipment: "Mancuernas" },
  { id: 32, name: "Face Pull", muscleGroup: "Hombros", equipment: "Polea" },
  { id: 33, name: "Remo al Mentón", muscleGroup: "Hombros", equipment: "Barra" },
  { id: 34, name: "Press en Máquina", muscleGroup: "Hombros", equipment: "Máquina" },

  // BRAZOS - BÍCEPS
  { id: 35, name: "Curl con Barra", muscleGroup: "Bíceps", equipment: "Barra" },
  { id: 36, name: "Curl con Barra Z", muscleGroup: "Bíceps", equipment: "Barra Z" },
  { id: 37, name: "Curl con Mancuernas", muscleGroup: "Bíceps", equipment: "Mancuernas" },
  { id: 38, name: "Curl Martillo", muscleGroup: "Bíceps", equipment: "Mancuernas" },
  { id: 39, name: "Curl Concentrado", muscleGroup: "Bíceps", equipment: "Mancuerna" },
  { id: 40, name: "Curl en Banco Scott", muscleGroup: "Bíceps", equipment: "Barra Z" },
  { id: 41, name: "Curl en Polea", muscleGroup: "Bíceps", equipment: "Polea" },
  { id: 42, name: "Curl Predicador", muscleGroup: "Bíceps", equipment: "Mancuernas" },

  // BRAZOS - TRÍCEPS
  { id: 43, name: "Press Francés", muscleGroup: "Tríceps", equipment: "Barra Z" },
  { id: 44, name: "Extensiones con Mancuerna", muscleGroup: "Tríceps", equipment: "Mancuerna" },
  { id: 45, name: "Fondos en Paralelas", muscleGroup: "Tríceps", equipment: "Peso Corporal" },
  { id: 46, name: "Press Cerrado", muscleGroup: "Tríceps", equipment: "Barra" },
  { id: 47, name: "Extensiones en Polea", muscleGroup: "Tríceps", equipment: "Polea" },
  { id: 48, name: "Patada de Tríceps", muscleGroup: "Tríceps", equipment: "Mancuerna" },
  { id: 49, name: "Extensiones sobre la Cabeza", muscleGroup: "Tríceps", equipment: "Polea" },

  // PIERNAS - CUÁDRICEPS
  { id: 50, name: "Sentadilla con Barra", muscleGroup: "Cuádriceps", equipment: "Barra" },
  { id: 51, name: "Sentadilla Frontal", muscleGroup: "Cuádriceps", equipment: "Barra" },
  { id: 52, name: "Sentadilla Búlgara", muscleGroup: "Cuádriceps", equipment: "Mancuernas" },
  { id: 53, name: "Prensa de Piernas", muscleGroup: "Cuádriceps", equipment: "Máquina" },
  { id: 54, name: "Extensiones de Cuádriceps", muscleGroup: "Cuádriceps", equipment: "Máquina" },
  { id: 55, name: "Zancadas con Barra", muscleGroup: "Cuádriceps", equipment: "Barra" },
  { id: 56, name: "Zancadas con Mancuernas", muscleGroup: "Cuádriceps", equipment: "Mancuernas" },
  { id: 57, name: "Hack Squat", muscleGroup: "Cuádriceps", equipment: "Máquina" },
  { id: 58, name: "Sentadilla Sissy", muscleGroup: "Cuádriceps", equipment: "Peso Corporal" },

  // PIERNAS - ISQUIOTIBIALES
  { id: 59, name: "Curl Femoral Acostado", muscleGroup: "Isquiotibiales", equipment: "Máquina" },
  { id: 60, name: "Curl Femoral Sentado", muscleGroup: "Isquiotibiales", equipment: "Máquina" },
  { id: 61, name: "Peso Muerto Piernas Rígidas", muscleGroup: "Isquiotibiales", equipment: "Barra" },
  { id: 62, name: "Buenos Días", muscleGroup: "Isquiotibiales", equipment: "Barra" },
  { id: 63, name: "Peso Muerto con Mancuernas", muscleGroup: "Isquiotibiales", equipment: "Mancuernas" },

  // PIERNAS - GLÚTEOS
  { id: 64, name: "Hip Thrust", muscleGroup: "Glúteos", equipment: "Barra" },
  { id: 65, name: "Patada de Glúteo en Polea", muscleGroup: "Glúteos", equipment: "Polea" },
  { id: 66, name: "Abducción de Cadera", muscleGroup: "Glúteos", equipment: "Máquina" },
  { id: 67, name: "Puente de Glúteos", muscleGroup: "Glúteos", equipment: "Peso Corporal" },
  { id: 68, name: "Step Ups", muscleGroup: "Glúteos", equipment: "Mancuernas" },

  // PIERNAS - PANTORRILLAS
  { id: 69, name: "Elevación de Pantorrillas de Pie", muscleGroup: "Pantorrillas", equipment: "Máquina" },
  { id: 70, name: "Elevación de Pantorrillas Sentado", muscleGroup: "Pantorrillas", equipment: "Máquina" },
  { id: 71, name: "Elevación en Prensa", muscleGroup: "Pantorrillas", equipment: "Máquina" },

  // CORE - ABDOMINALES
  { id: 72, name: "Crunch Abdominal", muscleGroup: "Abdominales", equipment: "Peso Corporal" },
  { id: 73, name: "Crunch en Polea", muscleGroup: "Abdominales", equipment: "Polea" },
  { id: 74, name: "Elevación de Piernas", muscleGroup: "Abdominales", equipment: "Peso Corporal" },
  { id: 75, name: "Plancha Frontal", muscleGroup: "Core", equipment: "Peso Corporal" },
  { id: 76, name: "Plancha Lateral", muscleGroup: "Core", equipment: "Peso Corporal" },
  { id: 77, name: "Russian Twist", muscleGroup: "Abdominales", equipment: "Peso Corporal" },
  { id: 78, name: "Mountain Climbers", muscleGroup: "Core", equipment: "Peso Corporal" },
  { id: 79, name: "Bicicleta Abdominal", muscleGroup: "Abdominales", equipment: "Peso Corporal" },
  { id: 80, name: "Ab Wheel", muscleGroup: "Core", equipment: "Rueda Abdominal" },
  { id: 81, name: "Crunch Invertido", muscleGroup: "Abdominales", equipment: "Peso Corporal" },
  { id: 82, name: "L-Sit", muscleGroup: "Core", equipment: "Peso Corporal" },

  // EJERCICIOS COMPUESTOS Y FUNCIONALES
  { id: 83, name: "Burpees", muscleGroup: "Cuerpo Completo", equipment: "Peso Corporal" },
  { id: 84, name: "Thruster", muscleGroup: "Cuerpo Completo", equipment: "Barra" },
  { id: 85, name: "Clean and Press", muscleGroup: "Cuerpo Completo", equipment: "Barra" },
  { id: 86, name: "Swing con Kettlebell", muscleGroup: "Cuerpo Completo", equipment: "Kettlebell" },
  { id: 87, name: "Turkish Get Up", muscleGroup: "Cuerpo Completo", equipment: "Kettlebell" },
  { id: 88, name: "Farmer's Walk", muscleGroup: "Cuerpo Completo", equipment: "Mancuernas" },
  { id: 89, name: "Battle Ropes", muscleGroup: "Cuerpo Completo", equipment: "Cuerdas" },

  // EJERCICIOS DE FLEXIBILIDAD Y MOVILIDAD
  { id: 90, name: "Estiramiento de Isquiotibiales", muscleGroup: "Isquiotibiales", equipment: "Peso Corporal" },
  { id: 91, name: "Estiramiento de Cuádriceps", muscleGroup: "Cuádriceps", equipment: "Peso Corporal" },
  { id: 92, name: "Cat-Cow Stretch", muscleGroup: "Espalda", equipment: "Peso Corporal" },
  { id: 93, name: "Child's Pose", muscleGroup: "Espalda", equipment: "Peso Corporal" },

  // EJERCICIOS OLÍMPICOS
  { id: 94, name: "Snatch", muscleGroup: "Cuerpo Completo", equipment: "Barra" },
  { id: 95, name: "Clean", muscleGroup: "Cuerpo Completo", equipment: "Barra" },
  { id: 96, name: "Jerk", muscleGroup: "Hombros", equipment: "Barra" },

  // EJERCICIOS CON BANDA ELÁSTICA
  { id: 97, name: "Press con Banda", muscleGroup: "Pecho", equipment: "Banda Elástica" },
  { id: 98, name: "Remo con Banda", muscleGroup: "Espalda", equipment: "Banda Elástica" },
  { id: 99, name: "Sentadilla con Banda", muscleGroup: "Piernas", equipment: "Banda Elástica" },
  { id: 100, name: "Face Pull con Banda", muscleGroup: "Hombros", equipment: "Banda Elástica" },
];

/**
 * Busca ejercicios por nombre
 * @param {string} query - Texto de búsqueda
 * @returns {Array} - Array de ejercicios que coinciden con la búsqueda
 */
export const searchExercises = (query) => {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  return EXERCISE_DATABASE.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm) ||
    exercise.muscleGroup.toLowerCase().includes(searchTerm) ||
    exercise.equipment.toLowerCase().includes(searchTerm)
  ).slice(0, 10); // Limitar a 10 resultados
};

/**
 * Obtiene ejercicios por grupo muscular
 * @param {string} muscleGroup - Grupo muscular a filtrar
 * @returns {Array} - Array de ejercicios del grupo muscular
 */
export const getExercisesByMuscleGroup = (muscleGroup) => {
  return EXERCISE_DATABASE.filter(exercise => 
    exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
  );
};

/**
 * Obtiene un ejercicio por ID
 * @param {number} id - ID del ejercicio
 * @returns {Object|null} - Ejercicio encontrado o null
 */
export const getExerciseById = (id) => {
  return EXERCISE_DATABASE.find(exercise => exercise.id === id) || null;
};
