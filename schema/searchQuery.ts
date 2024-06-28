import { z } from 'zod';

export const SearchQuerySchema = z.object({
    query: z.string().max(50),
})

export type SearchQuerySchemaType = z.infer<typeof SearchQuerySchema>