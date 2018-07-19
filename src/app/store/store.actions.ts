import { Action } from '@ngrx/store';

export const FETCH_TEMPS = 'FETCH_TEMPS';
export const SET_TEMPS = 'SET_TEMPS';

export class FetchTemps implements Action {
	readonly type = FETCH_TEMPS;
	constructor(public payload: string) { }
}

export class SetTemps implements Action {
	readonly type = SET_TEMPS;
	constructor(public payload: any) { }
}


export type StoreActions = FetchTemps | SetTemps;