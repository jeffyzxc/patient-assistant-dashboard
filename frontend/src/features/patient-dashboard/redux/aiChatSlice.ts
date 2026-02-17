import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AIChatResponse, ChatMessage, SendMessageRequest } from '../interfaces/chat.interface';
import { getChatHistory, sendMessage as sendMessageAPI } from '../api/chat.api'

export interface AIChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

export const sendMessage = createAsyncThunk<
  AIChatResponse,
  SendMessageRequest,
  { rejectValue: string }
>('aiChat/sendMessage', async (payload, thunkAPI) => {
  try {
    const res = await sendMessageAPI(payload);
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async thunk for fetching all messages of a patient
export const fetchAllMessages = createAsyncThunk<
  ChatMessage[],
  number,
  { rejectValue: string }
>('aiChat/fetchAllMessages', async (patientId, thunkAPI) => {
  try {
    const res = await getChatHistory(patientId);
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const initialState: AIChatState = {
  messages: [],
  loading: false,
  error: null
};

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    resetChat: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<AIChatResponse>) => {
        state.loading = false;
        state.messages.push(action.payload.inquiry, action.payload.response);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send message';
      })
      .addCase(fetchAllMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action: PayloadAction<ChatMessage[]>) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch messages';
      });
  },
});

export const { resetChat } = aiChatSlice.actions;
export default aiChatSlice.reducer;
