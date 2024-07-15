import { Drink, Map } from '../../types';
import classNames from 'classnames';

import seven_up from '../../images/seven_up.png';
import coca_cola from '../../images/coca_cola.png';
import fanta_lemon from '../../images/fanta_lemon.png';
import fanta from '../../images/fanta.png';
import pepsi from '../../images/pepsi.png';

import './DrinkImage.scss';

const images: Map<string> = {
	seven_up,
	coca_cola,
	fanta_lemon,
	fanta,
	pepsi
};

interface props {
	drink: Drink,
	className?: string,
	onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void,
};

const DrinkImage: React.FC<props> = ({ drink, className, onClick }) => (
	<img
		src={images[drink.fileName]}
		alt={drink.name}
		className={classNames('drink-image', className)}
		onClick={onClick}
	/>
);

export default DrinkImage;