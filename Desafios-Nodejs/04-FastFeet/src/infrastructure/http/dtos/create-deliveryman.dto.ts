import { z } from 'zod';

export const createDeliverymanSchema = z.object({
  cpf: z.string().min(11).max(14),
  password: z.string().min(6),
  name: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateDeliverymanDto = z.infer<typeof createDeliverymanSchema>;