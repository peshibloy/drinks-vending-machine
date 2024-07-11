import { useEffect, useState } from 'react';
import { getDrinks } from '../utils/data';
import { Drink } from '../types'

const useFetchDrinks = () => {
	const [data, setData] = useState<Drink[]>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await getDrinks();
				setData(res);
				// DOTO: remove any
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return { data, loading, error };
};

export default useFetchDrinks;