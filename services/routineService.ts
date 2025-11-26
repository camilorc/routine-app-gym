import { supabase } from '../auth/supabaseClient';
import { Database } from '../types/database';
import { Routine, DraftRoutine, RoutineExercise } from '../types';

type RoutineRow = Database['public']['Tables']['routines']['Row'];
type RoutineInsert = Database['public']['Tables']['routines']['Insert'];
type RoutineUpdate = Database['public']['Tables']['routines']['Update'];

type RoutineExerciseRow = Database['public']['Tables']['routine_exercises']['Row'];
type ExerciseSetInsert = Database['public']['Tables']['exercise_sets']['Insert'];

/**
 * Servicio para manejar operaciones de rutinas con Supabase
 */
export class RoutineService {
  
  /**
   * Obtener todas las rutinas del usuario actual
   */
  static async getUserRoutines(userId: string): Promise<Routine[]> {
    if (!supabase) {
      console.warn('Supabase not configured');
      return [];
    }

    const { data, error } = await supabase
      .from('routines')
      .select(`
        *,
        routine_exercises (
          *,
          exercises (*),
          exercise_sets (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching routines:', error);
      throw error;
    }

    // Transformar datos de BD a formato de la app
    return this.transformRoutinesFromDB(data);
  }

  /**
   * Crear una nueva rutina
   */
  static async createRoutine(draft: DraftRoutine, userId: string): Promise<Routine> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const now = new Date().toISOString();
    
    // 1. Crear la rutina
    const routineData: RoutineInsert = {
      user_id: userId,
      name: draft.name,
      description: draft.description || null,
      is_public: draft.is_public || false,
      is_template: draft.is_template || false,
      cloned_from_routine_id: null,
      is_modified: false,
      created_at: now,
      updated_at: now,
    };

    const { data: routine, error: routineError } = await supabase
      .from('routines')
      .insert(routineData)
      .select()
      .single();

    if (routineError || !routine) {
      console.error('Error creating routine:', routineError);
      throw routineError;
    }

    // 2. Crear los ejercicios de la rutina
    if (draft.exercises && draft.exercises.length > 0) {
      await this.saveRoutineExercises(routine.id, draft.exercises, userId);
    }

    // 3. Obtener la rutina completa con ejercicios
    return await this.getRoutineById(routine.id);
  }

  /**
   * Actualizar una rutina existente
   */
  static async updateRoutine(routineId: string, draft: DraftRoutine): Promise<Routine> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    // 0. Obtener user_id de la rutina existente
    const { data: existingRoutine } = await supabase
      .from('routines')
      .select('user_id')
      .eq('id', routineId)
      .single();

    if (!existingRoutine) {
      throw new Error('Routine not found');
    }

    // 1. Actualizar la rutina
    const routineData: RoutineUpdate = {
      name: draft.name,
      description: draft.description || null,
      is_public: draft.is_public || false,
      is_template: draft.is_template || false,
      is_modified: true,
      updated_at: new Date().toISOString(),
    };

    const { error: routineError } = await supabase
      .from('routines')
      .update(routineData)
      .eq('id', routineId);

    if (routineError) {
      console.error('Error updating routine:', routineError);
      throw routineError;
    }

    // 2. Eliminar ejercicios antiguos
    await supabase
      .from('routine_exercises')
      .delete()
      .eq('routine_id', routineId);

    // 3. Crear nuevos ejercicios
    if (draft.exercises && draft.exercises.length > 0) {
      await this.saveRoutineExercises(routineId, draft.exercises, existingRoutine.user_id);
    }

    // 4. Obtener la rutina completa
    return await this.getRoutineById(routineId);
  }

  /**
   * Eliminar una rutina
   */
  static async deleteRoutine(routineId: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('routines')
      .delete()
      .eq('id', routineId);

    if (error) {
      console.error('Error deleting routine:', error);
      throw error;
    }
  }

  /**
   * Obtener una rutina por ID
   */
  static async getRoutineById(routineId: string): Promise<Routine> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('routines')
      .select(`
        *,
        routine_exercises (
          *,
          exercises (*),
          exercise_sets (*)
        )
      `)
      .eq('id', routineId)
      .single();

    if (error || !data) {
      console.error('Error fetching routine:', error);
      throw error;
    }

    const routines = this.transformRoutinesFromDB([data]);
    return routines[0];
  }

  /**
   * Guardar ejercicios de una rutina
   */
  private static async saveRoutineExercises(routineId: string, exercises: RoutineExercise[], userId: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      
      // Crear ejercicio en la BD si no existe (ejercicios personalizados)
      let exerciseId = exercise.exerciseId;
      
      if (!exerciseId) {
        // Si existe basedOnExerciseId, obtener los datos del ejercicio base
        let muscleGroup = 'fullbody';
        let equipmentText = null;
        let equipmentCategory = null;
        
        if (exercise.basedOnExerciseId) {
          const { data: baseExercise } = await supabase
            .from('exercises')
            .select('muscle_group, equipment_text, equipment_category')
            .eq('id', exercise.basedOnExerciseId)
            .single();
          
          if (baseExercise) {
            muscleGroup = baseExercise.muscle_group;
            equipmentText = baseExercise.equipment_text;
            equipmentCategory = baseExercise.equipment_category;
          }
        }
        
        // Crear ejercicio personalizado
        const { data: newExercise, error: exerciseError } = await supabase
          .from('exercises')
          .insert({
            name: exercise.name,
            description: exercise.description || null,
            muscle_group: muscleGroup,
            equipment_text: equipmentText,
            equipment_category: equipmentCategory,
            created_by: userId,
            is_global: false,
            based_on_exercise_id: exercise.basedOnExerciseId || null
          })
          .select()
          .single();

        if (exerciseError || !newExercise) {
          console.error('Error creating exercise:', exerciseError);
          continue;
        }

        exerciseId = newExercise.id;
      }

      // Crear routine_exercise
      const { data: routineExercise, error: reError } = await supabase
        .from('routine_exercises')
        .insert({
          routine_id: routineId,
          exercise_id: exerciseId,
          order_index: i,
          notes: exercise.description || null,
        })
        .select()
        .single();

      if (reError || !routineExercise) {
        console.error('Error creating routine exercise:', reError);
        continue;
      }

      // Crear sets
      if (exercise.series && exercise.series.length > 0) {
        const sets: ExerciseSetInsert[] = exercise.series.map((serie, setIndex) => ({
          routine_exercise_id: routineExercise.id,
          set_number: setIndex + 1,
          reps: serie.reps || null, // Guardar como TEXT
          weight_kg: serie.weight || null, // Guardar como TEXT
          rir: serie.rir || null, // Guardar como TEXT
          rest_minutes: exercise.rest_minutes || null,
          rest_seconds: exercise.rest_seconds || null,
          completed: false,
        }));

        const { error: setsError } = await supabase
          .from('exercise_sets')
          .insert(sets);

        if (setsError) {
          console.error('Error creating sets:', setsError);
        }
      }
    }
  }

  /**
   * Transformar datos de BD al formato de la app
   */
  private static transformRoutinesFromDB(data: any[]): Routine[] {
    return data.map((routine) => {
      const exercises: RoutineExercise[] = routine.routine_exercises?.map((re: any, index: number) => ({
        name: re.exercises?.name || '',
        description: re.notes || '',
        exerciseId: re.exercise_id,
        series: re.exercise_sets?.map((set: any) => ({
          series: set.set_number?.toString() || '',
          reps: set.reps || '',
          weight: set.weight_kg || '',
          rir: set.rir || '',
        })) || [],
        rest_minutes: re.exercise_sets?.[0]?.rest_minutes || null,
        rest_seconds: re.exercise_sets?.[0]?.rest_seconds || null,
      })) || [];

      return {
        id: routine.id,
        user_id: routine.user_id,
        name: routine.name,
        description: routine.description,
        is_public: routine.is_public,
        is_template: routine.is_template,
        cloned_from_routine_id: routine.cloned_from_routine_id,
        is_modified: routine.is_modified,
        created_at: routine.created_at,
        updated_at: routine.updated_at,
        exercises,
      };
    });
  }
}
