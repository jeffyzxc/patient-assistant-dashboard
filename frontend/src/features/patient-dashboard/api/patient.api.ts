import type { CreatePatientRequest, CreatePatientResponse, UpdatePatientRequest, UpdatePatientResponse } from "../interfaces/patients.interface";
import api from "../../../config/api";


export const createPatient = async (data: CreatePatientRequest) : Promise<CreatePatientResponse> => {
    const response = await api.post(`/patients`, data);
    return response.data;
}

export const updatePatient = async (id: number, data: UpdatePatientRequest) => {
    const response = await api.put(`/patients/${id}`, data);

    return response.data;
}

export const deletePatient = async (id: number) : Promise<UpdatePatientResponse> => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
}

export const getAll = async (params?: { page?: number; limit?: number }) => {
  const response = await api.get(`/patients`, {
    params,
  });
  return response.data;
};