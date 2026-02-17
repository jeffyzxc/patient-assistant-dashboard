import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api/auth.api";
import type { RegisterRequest, RegisterResponse } from "../interfaces/auth.interfaces";

export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const useRegister = (params: { onSuccess: (user: RegisterResponse) => void }) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik<RegisterForm>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setServerError(null);
        const { email, password } = values;
        const user = await registerUser({ email, password } as RegisterRequest);

        if (user) {
          params.onSuccess(user);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setServerError(err.response?.data?.message || "Registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, serverError };
};
