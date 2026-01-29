import { GambleModule } from './modules/gamble/GambleModule';
import { EconomyModule } from './modules/economy/EconomyModule';

export class CommandHandler {
    private modules = {
        gamble: new GambleModule(),
        economy: new EconomyModule()
    };

    public handle(message: any) {
        const args = message.content.split(' ');
        const category = args[0]; // Ex: !gamble blackjack 100

        // Aqui você direciona para o módulo correto
        if (category.startsWith('!gamble')) {
            this.modules.gamble.handleCommand(message, args);
        }
    }
}