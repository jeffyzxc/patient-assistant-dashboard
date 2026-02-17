import React, { useEffect } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, TableFooter, TablePagination, Skeleton, IconButton, Stack
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import {  fetchPatients, setPage, setRowsPerPage } from "../redux/patientsSlice";
import type { CreatePatientResponse, PatientBase } from "../interfaces/patients.interface";

type PatientsTableProps = {
  onEdit?: (patient: CreatePatientResponse) => void; 
  onDelete?: (patient: PatientBase) => void; 
  onChat?: (patient: PatientBase) => void; 

};

export const PatientsTable: React.FC<PatientsTableProps> = ({ onEdit, onDelete, onChat }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, totalCount, loading, page, rowsPerPage } = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Medical Notes</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading
            ? Array.from({ length: rowsPerPage }).map((_, i) => (
                <TableRow key={i}>{Array.from({ length: 7 }).map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>
              ))
            : list.length === 0
            ? <TableRow><TableCell colSpan={7} align="center">No patients found</TableCell></TableRow>
            : list.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.DOB}</TableCell>
                  <TableCell>{patient.medicalNote}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton color="primary" onClick={() => onEdit?.(patient)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error"><DeleteIcon onClick={() => onDelete?.(patient)}/></IconButton>
                      <IconButton color="secondary"><ChatIcon onClick={() => onChat?.(patient)}/></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Rows per page"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
