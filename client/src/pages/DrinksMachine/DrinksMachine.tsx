import { Drink, STATES } from '../../types/index';
import DrinkItem from '../../components/DrinkItem/DrinkItem';
import InfoPanel from '../../components/InfoPanel/InfoPanel';
import DispenseArea from '../../components/DispenseArea/DispenseArea';
import useFetchDrinks from '../../hooks/useFetchDrinks';
import useDrinksMachine from '../../hooks/useDrinksMachine';
import { getMessage } from './utils';

import './DrinksMachine.scss';

const EMPTY_ARR: Drink[] = [];

const DrinksMachine = () => {
	const { data: drinks = EMPTY_ARR, update } = useFetchDrinks();
	const {
		selectedDrink,
		fsmState,
		handleSelection,
		handlePurchase,
		handleCancel,
		handleDelivered,
	} = useDrinksMachine(update);

	const disableSelection = fsmState !== STATES.START;
	const enablePurchase = fsmState === STATES.SELECTED && selectedDrink;
	const deliverDrink = fsmState === STATES.DELIVER_DRINK;
	const message = getMessage(fsmState);

	return (
		<div className="drinks-machine">
			<div className="drinks-list">
				{drinks.map(drink => (
					<DrinkItem
						key={drink.id}
						drink={drink}
						purchased={selectedDrink?.id === drink.id && deliverDrink}
						handleClick={handleSelection}
					/>
				))}
			</div>
			{disableSelection && <div className="overlay" />}
			<InfoPanel
				message={message}
				drink={enablePurchase ? selectedDrink : undefined}
				disabled={!enablePurchase}
				handlePurchase={handlePurchase}
				handleCancel={handleCancel}
			/>
			<DispenseArea drink={deliverDrink ? selectedDrink : undefined} handleClick={handleDelivered} />
		</div>
	);
};

export default DrinksMachine;
