import { supabase } from '../auth/supabaseClient';
import { Database } from '../types/database';
import { Exercise } from '../types';

type ExerciseRow = Database['public']['Tables']['exercises']['Row'];
type ExerciseInsert = Database['public']['Tables']['exercises']['Insert'];

/**
 * Servicio para manejar operaciones de ejercicios con Supabase
 */
export class ExerciseService {
  
  /**
   * Obtener todos los ejercicios globales
   */
  static async getGlobalExercises(): Promise<Exercise[]> {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('is_global', true)
      .order('name');

    if (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }

    return this.transformExercisesFromDB(data);
  }

  /**
   * Buscar ejercicios por nombre
   */
  static async searchExercises(query: string): Promise<Exercise[]> {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .or(`name.ilike.%${query}%,muscle_group.ilike.%${query}%,equipment_text.ilike.%${query}%,equipment_category.ilike.%${query}%`)
      .eq('is_global', true)
      .limit(10);

    if (error) {
      console.error('Error searching exercises:', error);
      return [];
    }

    return this.transformExercisesFromDB(data);
  }

  /**
   * Crear un ejercicio personalizado
   */
  static async createCustomExercise(exercise: {
    name: string;
    description?: string;
    muscle_group?: string;
    equipment_text?: string;
    equipment_category?: string;
    userId: string;
  }): Promise<Exercise> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const exerciseData: ExerciseInsert = {
      name: exercise.name,
      description: exercise.description || null,
      muscle_group: exercise.muscle_group || null,
      equipment_text: exercise.equipment_text || null,
      equipment_category: exercise.equipment_category || null,
      created_by: exercise.userId,
      is_global: false,
    };

    const { data, error } = await supabase
      .from('exercises')
      .insert(exerciseData)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating exercise:', error);
      throw error;
    }

    return this.transformExerciseFromDB(data);
  }

  /**
   * Obtener ejercicios del usuario (personalizados)
   */
  static async getUserExercises(userId: string): Promise<Exercise[]> {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('created_by', userId)
      .order('name');

    if (error) {
      console.error('Error fetching user exercises:', error);
      return [];
    }

    return this.transformExercisesFromDB(data);
  }

  /**
   * Transformar ejercicios de BD al formato de la app
   */
  private static transformExercisesFromDB(data: ExerciseRow[]): Exercise[] {
    return data.map(this.transformExerciseFromDB);
  }

  /**
   * Transformar un ejercicio de BD al formato de la app
   */
  private static transformExerciseFromDB(data: ExerciseRow): Exercise {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      muscle_group: data.muscle_group as any,
      secondary_muscles: data.secondary_muscles as any,
      equipment_text: data.equipment_text,
      equipment_category: data.equipment_category as any,
      difficulty: data.difficulty as any,
      video_url: data.video_url,
      image_url: data.image_url,
      instructions: data.instructions,
      created_by: data.created_by,
      is_global: data.is_global,
      based_on_exercise_id: data.based_on_exercise_id,
      usage_count: 0, // Este campo se calculará en el cliente si es necesario
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }
}
