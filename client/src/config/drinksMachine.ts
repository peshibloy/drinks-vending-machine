import FSM from 'fsm-js-lib';
import { EVENTS, STATES } from '../types';

const drinkMachineFSMConfig = {
	default: STATES.START,
	states: {
		[STATES.START]: {
			on: {
				[EVENTS.SELECT_DRINK]: STATES.SELECTED,
			},
		},
		[STATES.SELECTED]: {
			on: {
				[EVENTS.PURCHASE]: STATES.PURCHASED,
				[EVENTS.CANCEL]: STATES.START,
			},
		},
		[STATES.PURCHASED]: {
			on: {
				[EVENTS.PURCHASE_SUCCESS]: STATES.DELIVER_DRINK,
				[EVENTS.PURCHASE_FAILURE]: STATES.SELECTED,
			},
		},
		[STATES.DELIVER_DRINK]: {
			on: {
				[EVENTS.DELIVERED]: STATES.START,
			},
		},
	},
};

export const drinkMachineFSM = new FSM(drinkMachineFSMConfig);