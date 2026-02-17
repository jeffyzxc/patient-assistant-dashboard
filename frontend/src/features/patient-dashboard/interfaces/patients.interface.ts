
export interface CreatePatientRequest {
  name: string;
  email: string;
  phone: string;
  DOB: string; 
  medicalNote: string;
}

export interface UpdatePatientRequest {
  name: string;
  email: string;
  phone: string;
  DOB: string; 
  medicalNote: string;
  id: number
}

export type UpdatePatientResponse = PatientBase

export interface PatientBase {
  id: number;
  name: string;
  email: string;
  phone: string;
  DOB: string; 
  medicalNote: string;
  isDeleted: boolean;
  createdAt: string; 
  updatedAt: string; 
}

export type CreatePatientResponse = PatientBase

export interface PaginatedCreatePatientResponse {
  data: PatientBase[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}