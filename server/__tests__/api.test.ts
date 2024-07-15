const drinks: Drink[] = [
	{ id: 1, name: 'Coffee', price: 4.5, fileName: '' },
	{ id: 2, name: 'Tea', price: 2.0, fileName: '' },
	{ id: 3, name: 'Orange Juice', price: 3.0, fileName: '' },
]

import request from 'supertest';
import app from '../src/index';
import { Drink } from '../src/types';

jest.mock('../src/data/drinks', () => ({ drinks }));

describe('API Tests', () => {
	it('GET /api/drinks should return all drinks', async () => {
		const response = await request(app).get('/api/drinks');
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(3);
		expect(response.body).toEqual(expect.arrayContaining([
			expect.objectContaining({
				id: expect.any(Number),
				name: expect.any(String),
				price: expect.any(Number),
				fileName: expect.any(String),
			}),
		]));
	});

	it('POST /api/purchase should complete purchase if correct input', async () => {
		const validPurchase = {
			id: 1,
			price: 4.5,
		};

		const response = await request(app)
			.post('/api/purchase')
			.send(validPurchase);

		expect(response.status).toBe(200);
		const selectedDrink = drinks.find(({ id }) => validPurchase.id === id);
		expect(selectedDrink?.isSold).toBe(true);
	});

	it('POST /api/purchase should return 404 if drink not found', async () => {
		const invalidPurchase = {
			id: 999,
			price: 4.5,
		};

		const response = await request(app)
			.post('/api/purchase')
			.send(invalidPurchase);

		expect(response.status).toBe(404);
		expect(response.text).toBe('Drink not found');
	});

	it('POST /api/purchase should return 400 if price does not match', async () => {
		const invalidPrice = {
			id: 1,
			price: 5.0,
		};

		const response = await request(app)
			.post('/api/purchase')
			.send(invalidPrice);

		expect(response.status).toBe(400);
		expect(response.text).toBe('Wrong price');
	});
});
