import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.useWebSocketAdapter(new WsAdapter(app));
	const port = process.env.port || 3333;
	await app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}/${globalPrefix}`);
	});
}

bootstrap();
