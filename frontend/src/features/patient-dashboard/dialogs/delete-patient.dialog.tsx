import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import type { PatientBase } from "../interfaces/patients.interface";
import { useDeletePatient } from "../hooks/useDeletePatient";

type DeletePatientDialogProps = {
  open: boolean;
  onClose: () => void;
  patient: PatientBase;
  onSuccess?: (patient: PatientBase) => void;
};

export const DeletePatientDialog: React.FC<DeletePatientDialogProps> = ({
  open,
  onClose,
  patient,
  onSuccess,
}) => {
  const { handleDelete, loading, serverError } = useDeletePatient({
    patient,
    onClose,
    onSuccess,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Confirm Delete</DialogTitle>

      <DialogContent>
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Typography>
          Are you sure you want to delete patient{" "}
          <strong>{patient.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
