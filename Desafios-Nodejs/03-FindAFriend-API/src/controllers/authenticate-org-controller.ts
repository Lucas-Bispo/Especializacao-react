import { Request, Response } from 'express';
import { PrismaOrgRepository } from '../repositories/org-repository.js';
import { AuthenticateOrgUseCase } from '../use-cases/authenticate-org.js';


export async function authenticateOrgController(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const orgRepository = new PrismaOrgRepository();
    const authenticateOrg = new AuthenticateOrgUseCase(orgRepository);

    const { token } = await authenticateOrg.execute({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}