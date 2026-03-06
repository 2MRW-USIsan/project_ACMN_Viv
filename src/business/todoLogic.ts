import type { Todo } from "@/types/todo";

export function filterTodos(todos: Todo[], showCompleted: boolean): Todo[] {
  if (showCompleted) return todos;
  return todos.filter((todo) => !todo.completed);
}

export function sortTodosByDate(todos: Todo[]): Todo[] {
  return [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
