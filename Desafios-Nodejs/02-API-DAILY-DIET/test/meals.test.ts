import { expect, test } from 'vitest';
import { app } from '../src/app';


test('should create a new meal', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/meals',
    headers: {
      'user-id': '123e4567-e89b-12d3-a456-426614174000',
    },
    payload: {
      name: 'Breakfast',
      description: 'Healthy breakfast',
      datetime: '2023-10-01T08:00:00',
      is_diet: true,
    },
  });

  expect(response.statusCode).toBe(201);
});