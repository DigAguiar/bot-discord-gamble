import { prisma } from '../prisma';

export class UserService {
    /**
     * Busca um usuário pelo ID do Discord. 
     * Se não existir, cria um novo com o saldo inicial.
     */
    public static async getOrCreateUser(discordId: string) {
        let user = await prisma.user.findUnique({
            where: { id: discordId },
            include: { inventory: true } // Já traz os itens para o sistema de monopólio
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: discordId,
                    balance: 500, // Saldo inicial para começar a apostar
                },
                include: { inventory: true }
            });
            console.log(`[Database] Novo magnata registrado: ${discordId}`);
        }

        return user;
    }
}