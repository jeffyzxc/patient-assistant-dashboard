import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {
  getAll,
  updatePatient as updatePatientApi,
  deletePatient as deletePatientApi,
} from "../api/patient.api";
import type {
  CreatePatientResponse,
  UpdatePatientRequest,
} from "../interfaces/patients.interface";

interface PatientsState {
  list: CreatePatientResponse[];
  totalCount: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  error?: string | null;
}

const initialState: PatientsState = {
  list: [],
  totalCount: 0,
  loading: false,
  page: 0,
  rowsPerPage: 5,
  error: null,
};

export const fetchPatients = createAsyncThunk<
  { data: CreatePatientResponse[]; meta: { total: number } },
  { page: number; limit: number },
  { rejectValue: string }
>("patients/fetch", async ({ page, limit }, thunkAPI) => {
  try {
    const res = await getAll({ page: page + 1, limit });
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message || "Failed to fetch patients"
    );
  }
});

export const updatePatient = createAsyncThunk<
  CreatePatientResponse,
  UpdatePatientRequest,
  { rejectValue: string }
>("patients/update", async (patient, thunkAPI) => {
  try {
    const res = await updatePatientApi(patient.id, patient);
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message || "Failed to update patient"
    );
  }
});

export const deletePatient = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("patients/delete", async (id, thunkAPI) => {
  try {
    await deletePatientApi(id);
    return id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || err.message || "Failed to delete patient"
    );
  }
});

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalCount = action.payload.meta.total;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch patients";
      });

    builder
      .addCase(updatePatient.pending, (state) => {
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) state.list[index] = action.payload;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.error = action.payload || "Failed to update patient";
      });

    builder
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete patient";
      });
  },
});

export const { setPage, setRowsPerPage } = patientsSlice.actions;
export default patientsSlice.reducer;
