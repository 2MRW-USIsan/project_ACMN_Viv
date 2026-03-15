import { z } from "zod";

export const sampleItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const sampleItemArraySchema = z.array(sampleItemSchema);
