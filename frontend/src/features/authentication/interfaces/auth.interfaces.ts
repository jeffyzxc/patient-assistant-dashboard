export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: "Admin";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  role: "Admin";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
  expiresAt: number;
}