import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/prisma";
import type { CreateTodoInput, UpdateTodoInput } from "@/types/todo";

export const todoService = {
  async getAll() {
    return prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
  },

  async getById(id: number) {
    return prisma.todo.findUnique({ where: { id } });
  },

  async create(data: CreateTodoInput) {
    return prisma.todo.create({ data });
  },

  async update(id: number, data: UpdateTodoInput) {
    try {
      return await prisma.todo.update({ where: { id }, data });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        return null;
      }
      throw err;
    }
  },

  async delete(id: number) {
    try {
      await prisma.todo.delete({ where: { id } });
      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        return false;
      }
      throw err;
    }
  },
};
