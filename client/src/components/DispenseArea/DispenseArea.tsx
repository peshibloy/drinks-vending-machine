import { Drink } from '../../types';

import './DispenseArea.css';

interface props {
	drink: Drink | null,
	handleClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void,
};

const DispenseArea: React.FC<props> = ({ drink, handleClick }) => {
	return (
		<div className="dispense-area-container">
			<div className="dispense-area">
				<div className="dispense-window">
					{drink && (
						<img src={`images/${drink.fileName}`} alt={drink.name} className="drink-image" onClick={handleClick} />
					)}
				</div>
			</div>
		</div>
	);
};

export default DispenseArea;