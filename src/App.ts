import { Client, GatewayIntentBits } from 'discord.js';
import { CommandHandler } from './CommandHandler';

export class App {
    private client: Client;
    private commandHandler: CommandHandler;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
        this.commandHandler = new CommandHandler();
    }

    // Certifique-se de que este método existe e é publico
    public start(token: string) {
        this.client.once('ready', () => {
            console.log(`✅ Bot online como ${this.client.user?.tag}`);
            this.registerEvents();
        });

        this.client.login(token);
    }

    private registerEvents() {
        this.client.on('messageCreate', (msg) => {
            if (msg.author.bot) return;
            this.commandHandler.handle(msg);
        });
    }
}