import { Request, Response } from 'express';
import { drinks } from '../data/drinks';

export const getDrinks = (req: Request, res: Response) => {
	res.status(200).send(drinks);
};