import { Drink } from '../../types';
import classNames from 'classnames';

import './DrinkImage.scss';

interface props {
	drink: Drink,
	className?: string,
	onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void,
};

const DrinkImage: React.FC<props> = ({ drink, className, onClick }) => (
	<img
		src={`images/${drink.fileName}`}
		alt={drink.name}
		className={classNames('drink-image', className)}
		onClick={onClick}
	/>
);

export default DrinkImage;