import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import type { LoginRequest } from "../interfaces/auth.interfaces";
import type { AppDispatch } from "../../../store/index"; 

type UseLoginOptions = {
  onSuccess?: () => void;
};

export const useLogin = (options?: UseLoginOptions) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setServerError(null);
        await dispatch(login(values)).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setServerError(err || "Login failed");
      } finally {
        setSubmitting(false);
        options?.onSuccess?.();
      }
    },
  });

  return {
    formik,
    serverError,
  };
};
