import { describe, it, expect, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { authenticate } from './authenticate.ts';
import jwt from 'jsonwebtoken';

describe('authenticate middleware', () => {
  it('should call next() with valid token', () => {
    const req = { headers: { authorization: `Bearer ${jwt.sign({}, 'secret', { subject: 'org-id' })}` } } as Request;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    process.env.JWT_SECRET = 'secret';
    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.orgId).toBe('org-id');
  });

  it('should return 401 with invalid token', () => {
    const req = { headers: { authorization: 'Bearer invalid-token' } } as Request;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    process.env.JWT_SECRET = 'secret';
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
  });
});