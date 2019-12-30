import { Tile as State } from '@codenames/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as TilesActions from '../actions/tiles.actions';

const initialState: State[] = [];

const _tilesReducer = createReducer(
	initialState,
	on(TilesActions.TILES_SET, (_, { tiles }) => tiles),
);

export function tilesReducer(state: State[] | undefined, action: Action) {
	return _tilesReducer(state, action);
}
