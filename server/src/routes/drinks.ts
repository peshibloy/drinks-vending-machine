import { Router } from 'express';
import { getDrinks } from '../controllers/drinksController';

const router = Router();

router.get('/', getDrinks);

export default router;
