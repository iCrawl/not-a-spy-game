import { Scoreboard as State } from '@codenames/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as ScoreboardActions from '../actions/scoreboard.actions';

const initialState: State = {
	red: 0,
	blue: 0,
};

const _scoreboardReducer = createReducer(
	initialState,
	on(ScoreboardActions.SCORE_RED, (state) => ({ ...state, home: state.red - 1 })),
	on(ScoreboardActions.SCORE_BLUE, (state) => ({ ...state, away: state.blue - 1 })),
	on(ScoreboardActions.SCORE_RESET, () => initialState),
	on(ScoreboardActions.SCORE_SET, (_, { scoreboard }) => ({ red: scoreboard.red, blue: scoreboard.blue })),
);

export function scoreboardReducer(state: State | undefined, action: Action) {
	return _scoreboardReducer(state, action);
}
