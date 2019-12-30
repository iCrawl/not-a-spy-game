import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const USER_TEAM_RED = createAction('[USER] Team Red');
export const USER_TEAM_BLUE = createAction('[USER] Team Blue');
export const USER_ROLE_GUESSER = createAction('[USER] Guesser');
export const USER_ROLE_SPYMASTER = createAction('[USER] Spymaster');
export const USER_SET = createAction('[USER] Set User', props<User>());
export const USER_LOGGED_IN = createAction('[USER] Logged In');
