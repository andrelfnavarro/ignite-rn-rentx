import { z } from 'zod';
import { Car } from './CarDTO';

const UserSchedules = z.array(
  z.object({
    car: Car,
    user_id: z.number(),
    id: z.number(),
    date_start: z.string(),
    date_end: z.string(),
  })
);

export type TUserSchedules = z.infer<typeof UserSchedules>;
