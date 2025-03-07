import { Router } from 'express';
import { authenticateOrgController } from '../controllers/authenticate-org-controller.ts';

const authRoutes = Router();

authRoutes.post('/login', authenticateOrgController);

export { authRoutes };