import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";

import { updatePatient } from "../redux/patientsSlice";
import type {
  UpdatePatientRequest,
  UpdatePatientResponse,
} from "../interfaces/patients.interface";

type useUpdatePatientParams = {
  initialValues: UpdatePatientRequest;
  onSuccess: (patient: UpdatePatientResponse) => void;
  onClose: () => void;
};

export const useUpdatePatient = ({
  initialValues,
  onSuccess,
  onClose,
}: useUpdatePatientParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik<UpdatePatientRequest>({
    enableReinitialize: true,
    initialValues,

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string(),
      DOB: Yup.string().required("Date of Birth is required"),
      medicalNote: Yup.string(),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setServerError(null);

        const updatedPatient = await dispatch(updatePatient(values)).unwrap();
        
        onSuccess(updatedPatient);
        onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setServerError(err || "Failed to update patient");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, serverError };
};
