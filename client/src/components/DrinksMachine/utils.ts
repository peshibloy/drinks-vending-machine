import FSM from 'fsm-js-lib/fsm';

export enum STATES {
	START = 'start',
	SELECTED = 'selected',
	PURCHASED = 'purchased',
	DELIVER_DRINK = 'deliver_drink'
};

export enum EVENTS {
	SELECT_DRINK = 'SELECT_DRINK',
	PURCHASE = 'PURCHASE',
	CANCEL = 'CANCEL',
	DISPENSED = 'DISPENSED',
	DELIVER = 'DELIVER',
};

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
				[EVENTS.DISPENSED]: STATES.DELIVER_DRINK,
			},
		},
		[STATES.DELIVER_DRINK]: {
			on: {
				[EVENTS.DELIVER]: STATES.START,
			},
		},
	},
};

export const drinkMachineFSM = new FSM(drinkMachineFSMConfig);

export const getMessage = (state: string) => {
	if (state === STATES.START) {
		return 'Select a drink';
	}
	if (state === STATES.PURCHASED) {
		return 'Please wait';
	}
	if (state === STATES.DELIVER_DRINK) {
		return 'Take your drink';
	}
};