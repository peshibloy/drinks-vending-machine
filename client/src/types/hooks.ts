export interface UpdateDrink {
	(id: number, { }: { isSold: boolean }): void,
}