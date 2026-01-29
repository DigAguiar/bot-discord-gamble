import { Message } from 'discord.js';

export class EconomyModule {
    // Método principal para processar comandos de texto deste módulo
    public handleCommand(message: Message, args: string[]) {
        const command = args[0];

        if (command === 'balance' || command === 'bal') {
            this.showBalance(message);
        }
        
        if (command === 'daily') {
            this.processDaily(message);
        }
    }

    private showBalance(message: Message) {
        // Lógica de busca no Prisma e resposta
        message.reply("Seu saldo atual é de 🪙 500");
    }

    private processDaily(message: Message) {
        message.reply("Você resgatou suas 🪙 200 moedas diárias!");
    }
}