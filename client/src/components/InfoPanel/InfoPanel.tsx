import { Drink } from '../../types/index';

import './InfoPanel.scss';

interface props {
	drink?: Drink,
	message: string | undefined,
	disabled: boolean,
	handlePurchase: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	handleCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const InfoPanel: React.FC<props> = ({ message, drink, disabled, handlePurchase, handleCancel }) => {
	return (
		<div className="info-panel">
			<div className="info-message">{drink ? drink?.name : message}</div>
			<div className="drink-price">{drink ? `$${drink?.price}` : ''}</div>
			<button disabled={disabled} onClick={handlePurchase} className="purchase-btn">Purchase</button>
			<button disabled={disabled} onClick={handleCancel} className="cancel-btn">Cancel</button>
		</div>
	);
};

export default InfoPanel;