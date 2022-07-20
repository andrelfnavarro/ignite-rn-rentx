import { z } from 'zod';

export const Car = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  about: z.string(),
  period: z.string(),
  price: z.number(),
  fuel_type: z.enum(['gasoline_motor', 'electric_motor', 'hybrid_motor']),
  thumbnail: z.string().url(),
  accessories: z.array(
    z.object({
      id: z.string(),
      car_id: z.string(),
      type: z.enum([
        'speed',
        'acceleration',
        'turning_diameter',
        'exchange',
        'seats',
        'electric_motor',
        'gasoline_motor',
        'hybrid_motor',
      ]),
      name: z.string(),
    })
  ),
  photos: z.array(
    z.object({
      id: z.string(),
      car_id: z.string(),
      photo: z.string().url(),
    })
  ),
});

export type TCar = z.infer<typeof Car>;
