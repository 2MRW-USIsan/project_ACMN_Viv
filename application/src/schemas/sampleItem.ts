import { z } from "zod";

export const sampleItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const sampleItemArraySchema = z.array(sampleItemSchema);

export const sampleItemInputSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});
