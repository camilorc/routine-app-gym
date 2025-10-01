import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Crear el contexto de autenticación
const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener la sesión actual
    const getSession = async () => {
      try {
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Escuchar cambios de autenticación
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription?.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Función para iniciar sesión
  const signIn = async (email, password) => {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase not configured. Please check your configuration.' } 
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Función para registrarse
  const signUp = async (email, password, fullName) => {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase not configured. Please check your configuration.' } 
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            display_name: fullName
          }
        }
      });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } };
    }

    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};