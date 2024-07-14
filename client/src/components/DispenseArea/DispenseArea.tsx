import { useEffect, useState } from 'react';
import classNames from 'classnames';
import DrinkImage from '../../components/DrinkImage/Drinkimage';
import { Drink } from '../../types';

import './DispenseArea.css';

interface props {
	drink?: Drink,
	handleClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void,
};

const DispenseArea: React.FC<props> = ({ drink, handleClick }) => {
	const [dispense, setDispense] = useState(true);

	useEffect(() => {
		if (drink) {
			setDispense(true);

			setTimeout(() => {
				setDispense(false);
			}, 1000); // Duration to start animation
		}
	}, [drink]);

	return (
		<div className="dispense-area">
			<div className="dispense-window">
				<div className={classNames('dispensed-drink', { 'fade-in': !dispense }) }>
					{!dispense && drink && (
						<DrinkImage drink={drink} onClick={handleClick} />
					)}
				</div>
			</div>
		</div>
	);
};

export default DispenseArea;