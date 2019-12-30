import { Room as State } from '@codenames/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as RoomActions from '../actions/room.actions';

const initialState: State = {
	name: '',
	password: '',
	players: [],
};

const _roomReducer = createReducer(
	initialState,
	on(RoomActions.ROOM_SET, (_, { name, password, players }) => ({ name, password, players })),
	on(RoomActions.PLAYERS_SET, ({ name, password }, { players }) => ({ name, password, players })),
);

export function roomReducer(state: State | undefined, action: Action) {
	return _roomReducer(state, action);
}
