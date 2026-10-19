export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserPlan {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

export interface AuthUser {
  id: number | string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar_url?: string | null;
  plan_id?: number | null;
  plan?: UserPlan;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResponseData {
  user: AuthUser;
  token: string;
  expiresIn: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface ValidationErrorDetail {
  msg: string;
  path?: string;
  param?: string;
  value?: unknown;
}

export interface ApiErrorResponse {
  error?: string;
  message: string;
  details?: ValidationErrorDetail[];
}
