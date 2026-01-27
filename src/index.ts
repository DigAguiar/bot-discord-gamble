import { App } from './App';
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error('DISCORD_TOKEN is not defined in environment variables.');
}

const bot = new App();
bot.start(token);
