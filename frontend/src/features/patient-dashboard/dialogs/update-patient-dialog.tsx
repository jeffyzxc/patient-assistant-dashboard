import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useUpdatePatient } from "../hooks/useUpdatePatient";
import type {
  UpdatePatientRequest,
  CreatePatientResponse,
} from "../interfaces/patients.interface";

type UpdatePatientDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (patient: CreatePatientResponse) => void;
  patient: UpdatePatientRequest | null;
};

export const UpdatePatientDialog: React.FC<UpdatePatientDialogProps> = ({
  open,
  onClose,
  onSuccess,
  patient,
}) => {
  const { formik, serverError } = useUpdatePatient({
    initialValues: patient ?? {
      id: 0,
      name: "",
      email: "",
      phone: "",
      DOB: "",
      medicalNote: "",
    },
    onSuccess,
    onClose,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Patient</DialogTitle>

      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogContent>
          <Stack spacing={2}>
            {serverError && <Alert severity="error">{serverError}</Alert>}

            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextField
              label="DOB"
              name="DOB"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.DOB}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.DOB && Boolean(formik.errors.DOB)}
              helperText={formik.touched.DOB && formik.errors.DOB}
            />

            <TextField
              label="Medical Notes"
              name="medicalNote"
              multiline
              rows={3}
              fullWidth
              value={formik.values.medicalNote}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={formik.isSubmitting}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
            startIcon={
              formik.isSubmitting ? <CircularProgress size={18} /> : null
            }
          >
            {formik.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
