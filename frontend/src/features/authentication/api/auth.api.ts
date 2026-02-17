import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../interfaces/auth.interfaces";
import api from "../../../config/api";

export const registerUser = async (data: RegisterRequest) : Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginRequest) : Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
