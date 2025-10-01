import { createClient } from '@supabase/supabase-js';

// IMPORTANTE: Reemplaza estos valores con tus credenciales de Supabase
// Obtén estos valores desde tu dashboard de Supabase: https://app.supabase.com/
const supabaseUrl = 'https://mmppgwgwoqxesazqakmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcHBnd2d3b3F4ZXNhenFha21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTY3MTMsImV4cCI6MjA3NDgzMjcxM30.ridS6dG3ft4EDlnHh5eRKbiuu7VCzJqiZI-hbfx8sII';

// Verificar si las credenciales están configuradas
const isConfigured = supabaseUrl && 
                    supabaseAnonKey && 
                    supabaseUrl.includes('supabase.co') &&
                    supabaseUrl !== 'TU_SUPABASE_URL_AQUI' &&
                    supabaseAnonKey !== 'TU_SUPABASE_ANON_KEY_AQUI';

let supabase = null;

if (isConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('⚠️ Supabase credentials not configured. Please run "npm run setup"');
}

export { supabase };

// Funciones de autenticación
export const signInWithEmail = async (email, password) => {
  if (!supabase) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please run "npm run setup"' } 
    };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmail = async (email, password) => {
  if (!supabase) {
    return { 
      data: null, 
      error: { message: 'Supabase not configured. Please run "npm run setup"' } 
    };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = () => {
  if (!supabase) {
    return Promise.resolve({ data: { user: null }, error: null });
  }
  
  return supabase.auth.getUser();
};

export const onAuthStateChange = (callback) => {
  if (!supabase) {
    // Retornar un objeto que simule la suscripción
    return { 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    };
  }
  
  return supabase.auth.onAuthStateChange(callback);
};