import { z } from 'zod';

export const User = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  driver_license: z.string(),
  avatar: z.string().url().nullable(),
  token: z.string(),
});

export type TUser = z.infer<typeof User>;
