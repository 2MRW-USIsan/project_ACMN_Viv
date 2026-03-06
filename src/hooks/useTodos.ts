"use client";

import { useState, useEffect, useCallback } from "react";
import type { Todo, CreateTodoInput, UpdateTodoInput } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(
    async (input: CreateTodoInput) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Failed to create todo");
      await fetchTodos();
    },
    [fetchTodos]
  );

  const updateTodo = useCallback(
    async (id: number, input: UpdateTodoInput) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      await fetchTodos();
    },
    [fetchTodos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete todo");
      await fetchTodos();
    },
    [fetchTodos]
  );

  return { todos, loading, error, addTodo, updateTodo, deleteTodo, refetch: fetchTodos };
}
