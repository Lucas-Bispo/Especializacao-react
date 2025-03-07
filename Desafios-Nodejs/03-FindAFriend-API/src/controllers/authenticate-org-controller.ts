import { Request, Response } from 'express';
import { AuthenticateOrgUseCase } from '../use-cases/authenticate-org.ts';
import { PrismaOrgRepository } from '../repositories/prisma-org-repository.ts';

export async function authenticateOrgController(req: Request, res: Response) {
  const { email, password } = req.body;

  const orgRepository = new PrismaOrgRepository();
  const authenticateOrg = new AuthenticateOrgUseCase(orgRepository);

  const { org, token } = await authenticateOrg.execute({ email, password });

  return res.status(200).json({ org, token });
}