import { useEffect, useState } from 'react';
import { getDrinks } from '../utils/data';
import { Drink } from '../types/index';
import { UpdateDrink } from '../types/hooks';

const useFetchDrinks = () => {
	const [data, setData] = useState<Drink[]>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getDrinks();
			setData(res);
			// TODO: remove any
		} catch (err: any) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const update: UpdateDrink = (itemId, { isSold }) => {
		if (data) {
			const index = data?.findIndex(({ id }) => id === itemId);
			setData([
				...data?.slice(0, index),
				{ ...data[index], isSold },
				...data?.slice(index + 1, data.length),
			]);
		}
	};

	return { data, loading, error, update };
};

export default useFetchDrinks;