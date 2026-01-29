import { Message } from 'discord.js';

export class GambleModule {
    // Adicionando o método que o CommandHandler está tentando chamar
    public async handleCommand(message: Message, args: string[]) {
        const command = args[1]?.toLowerCase(); // Ex: !gamble blackjack -> blackjack

        if (!command) {
            message.reply("Você precisa especificar um jogo! Ex: `!gamble blackjack` ou `!gamble flip`.");
            return;
        }

        if (command === 'blackjack' || command === 'bj') {
            message.reply("🎲 O jogo de Blackjack será implementado em breve!");
        } else {
            message.reply("❓ Jogo não reconhecido no módulo de apostas.");
        }
    }
}