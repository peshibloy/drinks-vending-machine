import { fetchLocalDrinks } from '../__mocks__/mockApi';
import axios from 'axios';
import { Drink } from '../types';

const BASE_URL = 'http://localhost:5000';

export const getDrinks = async () => {
	if (process.env.NODE_ENV === 'production') {
		return fetchLocalDrinks();
	}
	return axios.get(`${BASE_URL}/api/drinks`)
		.then(response => response.data)
		.catch(error => {
			console.error(error);
			throw new Error(error.message);
		});
};

export const purchase = async (drink: Drink) => {
	if (process.env.NODE_ENV === 'production') {
		return Promise.resolve('completed');
	}
	return axios.post(`${BASE_URL}/api/purchase`, { id: drink.id, price: drink.price })
		.then(response => response.data)
		.catch(error => {
			console.error(error);
			throw new Error(error.message);
		});
};