import { useCallback, useState } from 'react';
import useFsm from 'fsm-js-lib/useFsm';
import classNames from 'classnames';
import { drinkMachineFSM, EVENTS, STATES, getMessage } from './utils';
import { purchase } from '../../utils/data';
import DrinkItem from '../DrinkItem/DrinkItem';
import { Drink } from '../../types';
import InfoPanel from '../InfoPanel/InfoPanel';
import DispenseArea from '../DispenseArea/DispenseArea';
import useFetchDrinks from '../../hooks/useFetchDrinks';

import './DrinksMachine.css';

const EMPTY_ARR: Drink[] = [];

const DrinksMachine = () => {
	const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

	const { state: fsmState, transition } = useFsm(drinkMachineFSM);
	const { data: drinks = EMPTY_ARR } = useFetchDrinks();

	const handleSelectDrink = useCallback((drink: Drink) => {
		transition(EVENTS.SELECT_DRINK);
		setSelectedDrink(drink);
	}, [transition]);

	const handlePurchase = useCallback(async () => {
		if (selectedDrink) {
			transition(EVENTS.PURCHASE);
			await purchase(selectedDrink?.price);
			transition(EVENTS.DISPENSED);
		}
	}, [selectedDrink, transition]);

	const handleCancel = useCallback(() => {
		transition(EVENTS.CANCEL);
		setSelectedDrink(null);
	}, [transition]);

	const handleRecieve = useCallback(() => {
		transition(EVENTS.DELIVER);
		setSelectedDrink(null);
	}, [transition]);

	const disableSelection = fsmState !== STATES.START;
	const enablePurchase = fsmState === STATES.SELECTED && selectedDrink;
	const deliverDrink = fsmState === STATES.DELIVER_DRINK;
	const message = getMessage(fsmState);

	return (
		<div className="drinks-machine">
			<div className={classNames('drinks-list', { disabled: disableSelection })}>
				{drinks.map(drink => (
					<DrinkItem key={drink.id} drink={drink} disabled={disableSelection} handleClick={handleSelectDrink} />
				))}
			</div>
			<InfoPanel
				message={message}
				drink={enablePurchase ? selectedDrink : null}
				disabled={!enablePurchase}
				handlePurchase={handlePurchase}
				handleCancel={handleCancel}
			/>
			<DispenseArea drink={deliverDrink ? selectedDrink : null} handleClick={handleRecieve} />
		</div>
	);
};

export default DrinksMachine;
