import { Team } from '@codenames/models';
import { createAction, props } from '@ngrx/store';

export const TURN_SET = createAction('[TURN] Set Turn', props<{ turn: Team }>());
