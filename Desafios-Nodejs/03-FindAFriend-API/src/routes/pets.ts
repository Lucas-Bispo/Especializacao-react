import { Router } from 'express';
import { listPetsByCityController } from '../controllers/list-pets-by-city-controller.ts';

const petRoutes = Router();

petRoutes.get('/pets', listPetsByCityController);

export { petRoutes };