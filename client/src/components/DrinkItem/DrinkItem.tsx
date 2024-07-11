import { useCallback } from 'react';
import classNames from 'classnames';
import { Drink } from '../../types';

import './DrinkItem.css';

interface props {
	drink: Drink,
	handleClick: Function,
	disabled: boolean
};

const DrinkItem: React.FC<props> = ({ drink, handleClick, disabled }) => {
	const handleClickWrapper = useCallback(() => {
		if (!disabled) {
			handleClick(drink);
		}
	}, [disabled, drink, handleClick]);

	return (
		<div className={classNames('drink-item', { disabled })} onClick={handleClickWrapper}>
			<img src={`images/${drink.fileName}`} alt={drink.name} className="drink-image" />
		</div>
	);
};

export default DrinkItem;