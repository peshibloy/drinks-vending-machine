import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getDrinks = async () => {
	return axios.get(`${BASE_URL}/api/drinks`)
		.then(response => response.data)
		.catch(error => {
			console.error(error);
			throw new Error(error.message);
		});
};

export const purchase = async (price: number) => {
	return axios.post(`${BASE_URL}/api/purchase`, { price })
		.then(response => response.data)
		.catch(error => {
			console.error(error);
			throw new Error(error.message);
		});
};