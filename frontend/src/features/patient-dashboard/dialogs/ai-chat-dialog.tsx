import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/index"; 
import { sendMessage, fetchAllMessages } from "./../redux/aiChatSlice";
import type { ChatMessage } from "../interfaces/chat.interface";

interface AIChatDialogProps {
  open: boolean;
  onClose: () => void;
  patientId: number;
}

export const AIChatDialog: React.FC<AIChatDialogProps> = ({ open, onClose, patientId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading } = useSelector((state: RootState) => state.aiChat);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && patientId) {
      dispatch(fetchAllMessages(patientId));
    }
  }, [open, patientId, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    setSending(true);
    try {
      await dispatch(sendMessage({ patientId, message: input }));
      setInput("");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>AI Chat</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "400px",
          gap: 1,
          pb: 2,
        }}
      >
        {(
          <List
            component="div"
            ref={scrollRef}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {messages.map((msg: ChatMessage) => (
              <ListItem
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: msg.senderType === "User" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: msg.senderType === "User" ? "#00acc1" : "#e0e0e0",
                    color: msg.senderType === "User" ? "#fff" : "#000",
                    p: 1.5,
                    borderRadius: 2,
                    borderTopLeftRadius: msg.senderType === "User" ? 2 : 0,
                    borderTopRightRadius: msg.senderType === "User" ? 0 : 2,
                  }}
                >
                  <Typography variant="body1">{msg.message}</Typography>
                </Box>
              </ListItem>
            ))}
            {sending && (
              <ListItem sx={{ justifyContent: "flex-start" }}>
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: "#e0e0e0",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <CircularProgress size={20} />
                  <Typography variant="body2" sx={{ ml: 1, display: "inline" }}>
                    AI is typing...
                  </Typography>
                </Box>
              </ListItem>
            )}
          </List>
        )}

        <Box sx={{ display: "flex", mt: "auto", gap: 1, alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={sending || loading}
          />
          <IconButton color="primary" onClick={handleSend} disabled={sending || loading || !input.trim()}>
            {sending ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
