import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  CircularProgress
} from "@mui/material";
import { useCreatePatient } from "../hooks/useCreatePatient";
import type { CreatePatientResponse } from "../interfaces/patients.interface";

type CreatePatientDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (patient: CreatePatientResponse) => void;
};

export const CreatePatientDialog = ({
  open,
  onClose,
  onSuccess
}: CreatePatientDialogProps) => {
  const { formik, serverError } = useCreatePatient({ onSuccess });

  return (
    <Dialog open={open} onClose={() => { onClose(); formik.resetForm()}} fullWidth maxWidth="sm">
      <DialogTitle>Add Patient</DialogTitle>
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
              type="email"
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
              type="tel"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
              error={formik.touched.medicalNote && Boolean(formik.errors.medicalNote)}
              helperText={formik.touched.medicalNote && formik.errors.medicalNote}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => { onClose(); formik.resetForm()}} color="secondary" disabled={formik.isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            startIcon={formik.isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {formik.isSubmitting ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
