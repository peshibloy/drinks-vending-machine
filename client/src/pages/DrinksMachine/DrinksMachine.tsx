import { useCallback, useState } from 'react';
import useFsm from 'fsm-js-lib/hooks/useFsm';
import { purchase } from '../../utils/data';
import { Drink, EVENTS, STATES } from '../../types/index';
import DrinkItem from '../../components/DrinkItem/DrinkItem';
import InfoPanel from '../../components/InfoPanel/InfoPanel';
import DispenseArea from '../../components/DispenseArea/DispenseArea';
import useFetchDrinks from '../../hooks/useFetchDrinks';
import { drinkMachineFSM } from './config';
import { getMessage } from './utils';

import './DrinksMachine.css';

const EMPTY_ARR: Drink[] = [];

const DrinksMachine = () => {
	const [selectedDrink, setSelectedDrink] = useState<Drink>();

	const { state: fsmState, transition } = useFsm(drinkMachineFSM);
	const { data: drinks = EMPTY_ARR, update } = useFetchDrinks();

	// add hook
	// add context

	const handleSelectDrink = useCallback((drink: Drink) => {
		transition(EVENTS.SELECT_DRINK);
		setSelectedDrink(drink);
	}, [transition]);

	const handlePurchase = useCallback(async () => {
		if (selectedDrink) {
			transition(EVENTS.PURCHASE);
			try {
				await purchase(selectedDrink);
				transition(EVENTS.PURCHASE_SUCCESS);
			} catch (err) {
				transition(EVENTS.PURCHASE_FAILURE);
			}
		}
	}, [selectedDrink, transition]);

	const handleCancel = useCallback(() => {
		transition(EVENTS.CANCEL);
		setSelectedDrink(undefined);
	}, [transition]);

	const handleRecieve = useCallback(async () => {
		if (selectedDrink) {
			await update(selectedDrink?.id, { sold: true });
		}
		transition(EVENTS.DELIVERED);
		setSelectedDrink(undefined);
	}, [update, transition, selectedDrink]);

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
						handleClick={handleSelectDrink}
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
			<DispenseArea drink={deliverDrink ? selectedDrink : undefined} handleClick={handleRecieve} />
		</div>
	);
};

export default DrinksMachine;
