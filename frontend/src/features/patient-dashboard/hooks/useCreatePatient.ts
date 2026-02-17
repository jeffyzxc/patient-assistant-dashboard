import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { CreatePatientRequest, CreatePatientResponse } from "../interfaces/patients.interface";
import { createPatient } from "../api/patient.api";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store"; 
import { fetchPatients } from "../redux/patientsSlice";

export type PatientForm = {
  name: string;
  email: string;
  phone: string;
  DOB: string;
  medicalNote: string;
};

export const useCreatePatient = (params: { onSuccess: (patient: CreatePatientResponse) => void }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { rowsPerPage } = useSelector((state: RootState) => state.patients);

  const formik = useFormik<PatientForm>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      DOB: "",
      medicalNote: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      DOB: Yup.string().required("Date of Birth is required"),
      medicalNote: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setServerError(null);

        const patient: CreatePatientRequest = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          DOB: values.DOB,
          medicalNote: values.medicalNote || "",
        };

        const createdPatient = await createPatient(patient);

        if (createdPatient) {
          params.onSuccess(createdPatient);

          dispatch(fetchPatients({ page: 0, limit: rowsPerPage }));
          resetForm();
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setServerError(err.response?.data?.message || "Failed to create patient");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, serverError };
};
