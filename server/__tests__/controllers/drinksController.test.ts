import { Request, Response } from 'express';
import { getDrinks } from '../../src/controllers/drinksController';
import { drinks } from '../../src/data/drinks';

describe('drinksController', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;

	beforeEach(() => {
		req = {};
		res = {
			json: jest.fn(),
		};
	});

	it('getDrinks should return all drinks', () => {
		getDrinks(req as Request, res as Response);
		expect(res.json).toHaveBeenCalledWith(drinks);
	});
});
