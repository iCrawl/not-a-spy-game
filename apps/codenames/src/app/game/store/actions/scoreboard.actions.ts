import { Scoreboard } from '@codenames/models';
import { createAction, props } from '@ngrx/store';

export const SCORE_RED = createAction('[SCOREBOARD] Red Score');
export const SCORE_BLUE = createAction('[SCOREBOARD] Blue Score');
export const SCORE_RESET = createAction('[SCOREBOARD] Score Reset');
export const SCORE_SET = createAction('[SCOREBOARD] Set Scores', props<{ scoreboard: Scoreboard }>());
