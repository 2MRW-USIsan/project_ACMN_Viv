import { NextResponse } from "next/server";
import { todoService } from "@/services/todoService";
import { createTodoSchema } from "@/types/todo";

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */
export async function GET() {
  const todos = await todoService.getAll();
  return NextResponse.json(todos);
}

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created todo
 *       400:
 *         description: Validation error
 */
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createTodoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const todo = await todoService.create(parsed.data);
  return NextResponse.json(todo, { status: 201 });
}
