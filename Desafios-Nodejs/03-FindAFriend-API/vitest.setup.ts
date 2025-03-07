import { vi } from 'vitest';

// Mock ou ajuste para garantir que bcrypt seja resolvido
vi.mock('bcrypt', async () => {
  const actual = await vi.importActual('bcrypt');
  return actual;
});