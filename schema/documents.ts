import { z } from "zod";

export const NewDocumentSchema = z.object({
  title: z.string().min(3).max(100),
  file: z.custom<File | null>((val) => val instanceof File, "Required"),
});

export type NewDocumentSchemaType = z.infer<typeof NewDocumentSchema>;