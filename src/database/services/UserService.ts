import { prisma } from "../prisma";

export class UserService {

  public async getOrCreateUser(discordId: string) {
    let user = await prisma.user.findUnique({
      where: { id: discordId },
      include: { inventory: true }, // Já traz os itens para o sistema de monopólio
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: discordId,
          balance: 500, // Saldo inicial para começar a apostar
        },
        include: { inventory: true },
      });
      console.log(`[Database] Novo magnata registrado: ${discordId}`);
    }

    return user;
  }

  public async claimDaily(discordId: string) {
    // 1. Garante que o usuário existe antes de tentar calcular tempo
    const user = await this.getOrCreateUser(discordId);

    const now = new Date();
    const COOLDOWN_HOURS = 24;
    const rewardAmount = 1000; // Valor do "Salário" diário

    // 2. Verificação de Cooldown
    if (user.lastDaily) {
      const lastClaim = new Date(user.lastDaily);
      const diffMs = now.getTime() - lastClaim.getTime();
      const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;

      if (diffMs < cooldownMs) {
        const remainingMs = cooldownMs - diffMs;
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remainingMs % (1000 * 60 * 60)) / (1000 * 60),
        );

        return {
          success: false,
          message: `⏳ Calma lá, trabalhador! Volte em **${hours}h ${minutes}m** para receber seu salário.`,
        };
      }
    }

    // 3. Transação Atômica (Update)
    // Usamos { increment } para evitar Race Conditions se houver múltiplas fontes de dinheiro
    const updatedUser = await prisma.user.update({
      where: { id: discordId },
      data: {
        balance: { increment: rewardAmount },
        lastDaily: now,
      },
    });

    return {
      success: true,
      message: `💰 **Pagamento Recebido!**\n+${rewardAmount} moedas foram adicionadas à sua conta.\nSaldo atual: **${updatedUser.balance}**`,
    };
  }
}
