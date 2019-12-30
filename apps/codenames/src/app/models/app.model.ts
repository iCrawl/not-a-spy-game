import { Game, Room } from '@codenames/models';
import { User } from '../models/user.model';

export interface App {
	user: User;
	room: Room;
	game: Game;
}
