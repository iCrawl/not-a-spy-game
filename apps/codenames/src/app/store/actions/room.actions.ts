import { Room, User } from '@codenames/models';
import { createAction, props } from '@ngrx/store';

export const ROOM_SET = createAction('[ROOM] Set Room', props<Room>());
export const PLAYERS_SET = createAction('[ROOM] Set Players', props<{ players: User[] }>());
