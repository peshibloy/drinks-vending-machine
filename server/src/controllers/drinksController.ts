import { Request, Response } from 'express';
import { drinks } from '../data/drinks';

export const getDrinks = (req: Request, res: Response) => {
	res.json(drinks);
};