import { STATES } from "../../types";

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