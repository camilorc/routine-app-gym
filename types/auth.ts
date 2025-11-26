/**
 * Tipos relacionados con autenticación y usuarios
 */

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    display_name?: string;
  };
}

export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthResponse {
  data: any;
  error: any;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: any }>;
}
