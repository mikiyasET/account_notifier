import {chatType} from "@prisma/client";

type alertType = {
    chatId: string,
    chatType: chatType,
    trigger: string,
}

export default alertType;