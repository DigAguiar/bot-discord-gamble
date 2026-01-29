import { GambleModule } from './modules/gamble/GambleModule';
import { EconomyModule } from './modules/economy/EconomyModule';

export class CommandHandler {
    private modules = {
        gamble: new GambleModule(),
        economy: new EconomyModule()
    };

    public handle(message: any) {
        // Ignorar mensagens de bots por segurança
        if (message.author.bot) return;

        const args = message.content.split(' ');
        const prefix = args[0].toLowerCase();

        // Direciona para o Gamble
        if (prefix.startsWith('!gamble')) {
            this.modules.gamble.handleCommand(message, args);
        } 
        // Direciona para o Economy (Comandos como !bal, !money, !daily)
        else if (prefix === '!bal' || prefix === '!balance' || prefix === '!daily') {
            this.modules.economy.handleCommand(message, args);
        }
    }
}