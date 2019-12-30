import { Tile } from '@codenames/models';
import { createAction, props } from '@ngrx/store';

export const TILES_SET = createAction('[TILES] Set Tiles', props<{ tiles: Tile[] }>());
