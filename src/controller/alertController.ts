import {Prisma, alert, alertStatus, chatType} from "@prisma/client";
import {prisma} from "../client";
import alertType from "../types/alert";

class AlertController {

    static async create(data: Prisma.alertUncheckedCreateInput): Promise<alert> {
        return prisma.alert.create({
            data: data,
        });
    }

    static async update(id: number, data: Prisma.alertUncheckedUpdateInput): Promise<alert> {
        return prisma.alert.update({
            where: {
                id: id,
            },
            data: data,
        });
    }

    static async delete(id: number): Promise<alert> {
        return prisma.alert.delete({
            where: {
                id: id,
            },
        });
    }

    static async get(id: number): Promise<alert | null> {
        return prisma.alert.findUnique({
            where: {
                id: id,
            },
        });
    }
    static async getAll(): Promise<alert[]> {
        return prisma.alert.findMany();
    }

    static async getByChatId(id: string): Promise<alert | null> {
        return prisma.alert.findUnique({
            where: {
                chatId: id,
            },
        });
    }

    static async getOn(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                status: alertStatus.on
            }
        });
    }
    static async getOff(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                status: alertStatus.off
            }
        });
    }
    static async turnOn(chatId: string): Promise<alert> {
        return prisma.alert.update({
            where: {
                chatId: chatId,
            },
            data: {
                status: alertStatus.on,
            }
        });
    }
    static async turnOff(chatId: string): Promise<alert> {
        return prisma.alert.update({
            where: {
                chatId: chatId,
            },
            data: {
                status: alertStatus.off,
            }
        });
    }
    static async checkIfExist(alert: alertType): Promise<alert | null> {
        return prisma.alert.findFirst({
            where: {
                chatId: alert.chatId,
            }
        });
    }
    static async addAlert(alert: alertType): Promise<alert> {
        const checker = await this.checkIfExist(alert);
        if (checker == null) {
            return await this.create({
                chatId: alert.chatId,
                type: alert.chatType,
                trigger: alert.trigger,
            });
        } else {
            return prisma.alert.update({
                where: {
                    chatId: alert.chatId,
                },
                data: {
                    trigger: alert.trigger,
                    status: alertStatus.on
                }
            });
        }
    }
    static async getUser(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                type: chatType.user
            }
        });
    }

    static async getChannel(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                type: chatType.channel
            }
        });
    }

    static async getGroup(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                type: chatType.group
            }
        });
    }

    static async getBot(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                type: chatType.bot
            }
        });
    }

    static async getUnknown(): Promise<alert[]> {
        return prisma.alert.findMany({
            where: {
                type: chatType.unknown
            }
        });
    }
}

export {AlertController}