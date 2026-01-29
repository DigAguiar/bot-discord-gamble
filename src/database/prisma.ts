import { PrismaClient } from '@prisma/client';

// Instância única para ser usada em todo o projeto
export const prisma = new PrismaClient();