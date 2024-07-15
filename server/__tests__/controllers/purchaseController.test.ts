import { Request, Response } from 'express';
import { purchase } from '../../src/controllers/purchaseController';
import { drinks } from '../../src/data/drinks';

describe('purchaseController', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;

	beforeEach(() => {
		req = {
			body: {
				id: 1,
				price: 4.5,
			},
		};
		res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		};
	});

	it('purchase should complete successfully with correct inputs', () => {
		purchase(req as Request, res as Response);
		const selectedDrink = drinks.find(({ id }) => req.body.id === id);
		expect(selectedDrink?.isSold).toBe(true);
		expect(res.send).toHaveBeenCalledWith('completed');
	});

	it('purchase should return 404 if drink not found', () => {
		req.body.id = 999; // Non-existing drink ID
		purchase(req as Request, res as Response);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.send).toHaveBeenCalledWith('Drink not found');
	});

	it('purchase should return 400 if price does not match', () => {
		req.body.price = 5.0; // Incorrect price
		purchase(req as Request, res as Response);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.send).toHaveBeenCalledWith('Wrong price');
	});
});
