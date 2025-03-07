import { Router } from 'express';
import { listPetsByCityController } from '../controllers/list-pets-by-city-controller.ts';
import { authenticate } from '../controllers/authenticate.ts';
import { registerPetController } from '../controllers/register-pet-controller.ts';


const petRoutes = Router();

petRoutes.get('/pets', listPetsByCityController);
petRoutes.post('/pets', authenticate, registerPetController);

export { petRoutes };