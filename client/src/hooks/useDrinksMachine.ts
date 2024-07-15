import { useCallback, useState } from 'react';
import useFsm from 'fsm-js-lib/hooks/useFsm';
import { purchase } from '../utils/data';
import { drinkMachineFSM } from '../config/drinksMachine';
import { Drink, EVENTS } from '../types';
import { UpdateDrink } from '../types/hooks';

const useDrinksMachine = (update: UpdateDrink) => {
	const [selectedDrink, setSelectedDrink] = useState<Drink>();

	const { state: fsmState, transition } = useFsm(drinkMachineFSM);
	// TODO: add context

	const handleSelection = useCallback((drink: Drink) => {
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

	const handleDelivered = useCallback(async () => {
		if (selectedDrink) {
			await update(selectedDrink?.id, { isSold: true });
		}
		transition(EVENTS.DELIVERED);
		setSelectedDrink(undefined);
	}, [update, transition, selectedDrink]);

	return {
		selectedDrink,
		fsmState,
		handleSelection,
		handlePurchase,
		handleCancel,
		handleDelivered,
	};
};

export default useDrinksMachine;