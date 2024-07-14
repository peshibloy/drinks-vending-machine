import { Request, Response } from 'express';
import { drinks } from '../data/drinks';

export const purchase = (req: Request, res: Response) => {
	const { id: drinkId, price } = req.body;
	const selectedDrink = drinks.find(({ id }) => drinkId === id);
	if (!selectedDrink) {
		return res.status(404).send('Drink not found');
	}
	if (price !== selectedDrink.price) {
		return res.status(400).send('Wrong price');
	}
	selectedDrink.sold = true;
	res.send('completed');
};