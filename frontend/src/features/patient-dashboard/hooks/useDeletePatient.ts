import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../store";
import {
  deletePatient,
  fetchPatients,
  setPage,
} from "../redux/patientsSlice";

import type { PatientBase } from "../interfaces/patients.interface";

type UseDeletePatient = {
  patient: PatientBase;
  onClose: () => void;
  onSuccess?: (patient: PatientBase) => void;
};

export const useDeletePatient = ({
  patient,
  onClose,
  onSuccess,
}: UseDeletePatient) => {
  const dispatch = useDispatch<AppDispatch>();

  const { list, page, rowsPerPage } = useSelector(
    (state: RootState) => state.patients
  );

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!patient) return;

    setLoading(true);
    setServerError(null);

    try {
      await dispatch(deletePatient(patient.id)).unwrap();
      const remainingItems = list.length - 1;
      let nextPage = page;
      if (remainingItems <= page * rowsPerPage && page > 0) {
        nextPage = page - 1;
        dispatch(setPage(nextPage));
      }

      dispatch(fetchPatients({ page: nextPage, limit: rowsPerPage }));

      onSuccess?.(patient);

      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Delete failed", err);
      setServerError(err?.message || "Failed to delete patient");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDelete,
    loading,
    serverError,
  };
};
