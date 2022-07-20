import { z } from 'zod';

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  driver_license: z.string(),
  avatar: z.string().url().nullable(),
});

export type TUser = z.infer<typeof User>;
