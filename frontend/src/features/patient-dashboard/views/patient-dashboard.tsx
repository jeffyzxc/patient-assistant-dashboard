// ProfessionalPatientDashboard.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreatePatientDialog } from "../dialogs/create-patient.dialog";
import type { CreatePatientResponse, PatientBase } from "../interfaces/patients.interface";
import { PatientsTable } from "../components/patient-table.component";
import { UpdatePatientDialog } from "../dialogs/update-patient-dialog";
import { DeletePatientDialog } from "../dialogs/delete-patient.dialog";
import { AIChatDialog } from "../dialogs/ai-chat-dialog";

const PatientDashboard: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false); // update modal state
  const [selectedPatient, setSelectedPatient] = useState<PatientBase | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openAIChat, setOpenAIChat] = useState(false);

  const handleCreateSuccess = (newPatient: CreatePatientResponse) => {
    setToastMessage(`Patient "${newPatient.name}" created successfully!`);
    setToastOpen(true); 
    setOpenForm(false); 
  };

  const handleToastClose = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  const handleEditPatient = (patient: PatientBase) => {
    setSelectedPatient(patient);
    setOpenUpdateForm(true);
  };

  const handleChatAI = (patient: PatientBase) => {
    setSelectedPatient(patient);
    setOpenAIChat(true);
  };

  const handleUpdateSuccess = (updatedPatient: CreatePatientResponse) => {
    setToastMessage(`Patient "${updatedPatient.name}" updated successfully!`);
    setToastOpen(true);
    setOpenUpdateForm(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = (patient: PatientBase) => {
    setSelectedPatient(patient);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = (patient: PatientBase) => {
    setToastMessage(`Patient "${patient.name}" deleted successfully!`);
    setToastOpen(true);
    setSelectedPatient(null);
  };

  return (
    <Box>
      <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
          >
            Add Patient
          </Button>
      </Box>

        <CreatePatientDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSuccess={handleCreateSuccess}
        />

        <UpdatePatientDialog
          open={openUpdateForm}
          onClose={() => setOpenUpdateForm(false)}
          onSuccess={handleUpdateSuccess}

          patient={selectedPatient}
        />

        {selectedPatient && (
          <DeletePatientDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            patient={selectedPatient}
            onSuccess={handleDeleteSuccess} 
          />
        )}

        <AIChatDialog open={openAIChat}
          onClose={() => setOpenAIChat(false)}
          patientId={selectedPatient?.id || 0}>
        </AIChatDialog>

        <PatientsTable 
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
          onChat={handleChatAI}
        />

        <Snackbar
          open={toastOpen}
          autoHideDuration={4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleToastClose}
            severity="success"
            sx={{ width: "100%" }}
            variant="filled"
          >
            {toastMessage}
          </Alert>
        </Snackbar>
        

      </Container>
    </Box>
  );
};

export default PatientDashboard;
