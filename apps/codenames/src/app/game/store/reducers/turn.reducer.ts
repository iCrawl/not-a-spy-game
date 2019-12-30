import { Team } from '@codenames/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as TurnActions from '../actions/turn.actions';

const initialState: Team = 2;

const _turnReducer = createReducer(
	initialState,
	on(TurnActions.TURN_SET, (_, { turn }) => turn),
);

export function turnReducer(state: Team | undefined, action: Action) {
	return _turnReducer(state, action);
}
