export interface Drink {
	id: number;
	name: string;
	price: number;
	fileName: string;
	isSold?: boolean,
}

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
	PURCHASE_SUCCESS = 'PURCHASE_SUCCESS',
	PURCHASE_FAILURE = 'PURCHASE_FAILURE',
	DELIVERED = 'DELIVERED',
};