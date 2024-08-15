import { PrismaClient } from "@prisma/client";

export class MessageRepo {
    private static prismaClient = new PrismaClient;

    public static get repo() {
        return this.prismaClient.message;
    }
}

