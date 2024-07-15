import { useCallback } from 'react';
import classNames from 'classnames';
import { Drink } from '../../types';
import DrinkImage from '../DrinkImage/Drinkimage';

import './DrinkItem.scss';

interface props {
	drink: Drink,
	purchased: boolean,
	handleClick: Function,
};

const DrinkItem: React.FC<props> = ({ drink, purchased, handleClick }) => {
	const clickable = !drink.isSold;

	const handleClickWrapper = useCallback(() => {
		if (clickable) {
			handleClick(drink);
		}
	}, [clickable, drink, handleClick]);

	return (
		<div className={classNames('drink-item', { clickable })} onClick={handleClickWrapper}>
			<div className={classNames({ 'fade-out': purchased })}>
				{!drink.isSold && <DrinkImage drink={drink} />}
			</div>
		</div>
	);
};

export default DrinkItem;