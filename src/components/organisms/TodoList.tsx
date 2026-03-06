"use client";

import { List, Alert, CircularProgress, Box, Typography } from "@mui/material";
import AddTodoForm from "@/components/molecules/AddTodoForm";
import TodoItem from "@/components/molecules/TodoItem";
import { useTodos } from "@/hooks/useTodos";

export default function TodoList() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } =
    useTodos();

  const handleToggle = async (id: number, completed: boolean) => {
    await updateTodo(id, { completed });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <AddTodoForm onAdd={(title) => addTodo({ title })} />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {todos.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
          No todos yet. Add one above!
        </Typography>
      ) : (
        <List>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={deleteTodo}
            />
          ))}
        </List>
      )}
    </Box>
  );
}
