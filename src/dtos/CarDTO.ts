import { z } from 'zod';

const Car = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  about: z.string(),
  rent: z.object({
    period: z.string(),
    price: z.number(),
  }),
  fuel_type: z.string(),
  thumbnail: z.string().url(),
  accessories: z.array(
    z.object({
      type: z.string(),
      name: z.string(),
    })
  ),
  photos: z.array(z.string().url()),
});

export type TCar = z.infer<typeof Car>;
