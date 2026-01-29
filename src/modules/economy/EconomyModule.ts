import { Message } from 'discord.js';
import { UserService } from '../../database/services/UserService';

export class EconomyModule {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // CORREÇÃO: Renomeado para 'handleCommand' e ajustado os argumentos
    public async handleCommand(msg: Message, args: string[]) {
        // Como o CommandHandler não passou o nome do comando explícito, 
        // vamos extraí-lo da mensagem (ex: "!daily" -> "daily")
        const command = msg.content.trim().split(/ +/)[0].slice(1).toLowerCase();

        switch (command) {
            case 'bal':
            case 'saldo':
                const user = await this.userService.getOrCreateUser(msg.author.id);
                
                msg.reply(`💳 **Extrato Bancário**\nTitular: ${msg.author.username}\nSaldo em carteira: **${user.balance}** moedas`);
                break;

            case 'daily':
            case 'diario':
                const result = await this.userService.claimDaily(msg.author.id);
                msg.reply(result.message);
                break;
                
            default:
                // Se o comando não for deste módulo, apenas ignoramos
                break;
        }
    }
}