import { Drink } from '../types';
import { mockDrinks } from './mockData';

export const fetchLocalDrinks = (): Promise<Drink[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockDrinks);
		}, 1000); // Simulate delay for asynchronous behavior
	});
};