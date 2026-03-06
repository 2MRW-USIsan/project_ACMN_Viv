"use client";

import { ListItem, ListItemText, Typography } from "@mui/material";
import TodoCheckbox from "@/components/atoms/TodoCheckbox";
import DeleteButton from "@/components/atoms/DeleteButton";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <ListItem
      disablePadding
      secondaryAction={<DeleteButton onClick={() => onDelete(todo.id)} />}
      sx={{ pr: 6 }}
    >
      <TodoCheckbox
        checked={todo.completed}
        onChange={(checked) => onToggle(todo.id, checked)}
      />
      <ListItemText
        primary={
          <Typography
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "text.secondary" : "text.primary",
            }}
          >
            {todo.title}
          </Typography>
        }
      />
    </ListItem>
  );
}
