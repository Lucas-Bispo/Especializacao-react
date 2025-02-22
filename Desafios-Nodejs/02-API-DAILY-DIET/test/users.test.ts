import { expect, test } from 'vitest';
import { app } from '../src/app';


test('should create a new user', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/users',
    payload: {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    },
  });

  expect(response.statusCode).toBe(201);
});