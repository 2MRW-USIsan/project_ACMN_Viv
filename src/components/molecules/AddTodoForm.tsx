"use client";

import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTodoFormProps {
  onAdd: (title: string) => Promise<void>;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      await onAdd(trimmed);
      setTitle("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 2 }}
    >
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        size="small"
        fullWidth
        disabled={loading}
        inputProps={{ maxLength: 255 }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !title.trim()}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </Box>
  );
}
