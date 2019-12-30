import { Module } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
	providers: [RoomService, WebsocketGateway],
})
export class WebsocketModule {}
