import { Role, Team } from '@codenames/models';
import { Action, createReducer, on } from '@ngrx/store';
import nanoid from 'nanoid';
import { User as State } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';

const initialState: State = {
	id: nanoid(),
	name: 'Guest',
	team: Team.UNASSIGNED,
	role: Role.GUESSER,
	loggedIn: false,
};

const _userReducer = createReducer(
	initialState,
	on(UserActions.USER_TEAM_RED, state => ({ ...state, team: Team.RED })),
	on(UserActions.USER_TEAM_BLUE, state => ({ ...state, team: Team.BLUE })),
	on(UserActions.USER_ROLE_GUESSER, state => ({ ...state, role: Role.GUESSER })),
	on(UserActions.USER_ROLE_SPYMASTER, state => ({ ...state, role: Role.SPYMASTER })),
	on(UserActions.USER_LOGGED_IN, state => ({ ...state, loggedIn: true })),
	on(UserActions.USER_SET, (state, user) => ({ ...state, ...user })),
);

export function userReducer(state: State | undefined, action: Action) {
	return _userReducer(state, action);
}
