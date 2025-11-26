/**
 * Punto de entrada central para todos los tipos del proyecto
 * 
 * Organización:
 * - database.ts: Tipos de la base de datos de Supabase
 * - exercise.ts: Tipos relacionados con ejercicios
 * - routine.ts: Tipos relacionados con rutinas
 * - auth.ts: Tipos relacionados con autenticación
 * - context.ts: Tipos relacionados con contextos de React
 * - navigation.ts: Tipos relacionados con React Navigation
 */

// Re-exportar tipos de base de datos
export * from './database';

// Re-exportar todos los tipos de ejercicios
export * from './exercise';

// Re-exportar todos los tipos de rutinas
export * from './routine';

// Re-exportar todos los tipos de autenticación
export * from './auth';

// Re-exportar todos los tipos de contextos
export * from './context';

// Re-exportar todos los tipos de navegación
export * from './navigation';
