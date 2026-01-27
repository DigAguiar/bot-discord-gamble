import { Client, GatewayIntentBits } from 'discord.js';

export class App {
    private client: Client;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
    }

    public start(token: string) {
        this.client.once('ready', () => {
            console.log(`✅ Bot online como ${this.client.user?.tag}`);
            this.registerEvents();
        });

        this.client.login(token);
    }

    private registerEvents() {
        this.client.on('messageCreate', (msg) => {
            if (msg.content === '!ping') msg.reply('pong!');
        });
    }
}