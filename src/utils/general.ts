import {Api} from "telegram";
import int = Api.int;
import {client, self} from "../client";
import sender from "../types/sender";
import {chatType} from "@prisma/client";
import {AlertController} from "../controller/alertController";
import axios from "axios";

const whoisSender = async (event: any): Promise<sender> => {
    const dialogs = (await client.getDialogs({
        limit: 10
    }));
    let id = 0;
    if (event.message.peerId instanceof Api.PeerChannel) {
        id = event.message.peerId.channelId.value;
    }
    else if (event.message.peerId instanceof Api.PeerUser) {
        id = event.message.peerId.userId;
    }
    for (const dialog of dialogs) {
        if (dialog.id.toString().startsWith("-100")) {
            dialog.id = dialog.id.toString().replace("-100", "");
        }
        if (id.toString() == dialog.id.toString()) {
            const entity = dialog.entity;
            if (dialog.isUser) {
                if (entity.bot) {
                    return {
                        type: chatType.bot,
                        self: entity,
                        message: event.message,
                    };
                } else if (entity.self) {
                    return {
                        type: chatType.self,
                        self: entity,
                        message: event.message,
                    };
                } else {
                    return {
                        type: chatType.user,
                        self: entity,
                        message: event.message,
                    };
                }
            }
            else if (dialog.isGroup) {
                return {
                    type: chatType.group,
                    self: entity,
                    message: event.message,
                };
            }
            else if (dialog.isChannel) {
                return {
                    type: chatType.channel,
                    self: entity,
                    message: event.message,
                };
            }
            break;
        }
    }
    return {
        type: chatType.unknown,
        self: null,
        message: null,
    };

};
const compareId = (first: any, second: any) => {
    first = first.toString();
    second = second.toString();
    if (first.startsWith("-100"))
        first = first.replace("-100", "");
    if (second.startsWith("-100"))
        second = second.replace("-100", "");
    return first === second;
}
const whoisPeer = (peerId: any): sender => {
    if (peerId instanceof Api.PeerChannel) {
        return {
            type: chatType.channel,
            self: null,
            message: null,
        }
    } else if (peerId instanceof Api.PeerUser) {
        return {
            type: chatType.user,
            self: null,
            message: null,
        }
    }
    return {
        type: chatType.unknown,
        self: null,
        message: null,
    }
}
const peerToId = (peer: Api.TypePeer) => {
    if (peer instanceof Api.PeerChannel) {
        return peer.channelId;
    } else if (peer instanceof Api.PeerUser) {
        return peer.userId;
    }
    return 0;
}
const whois = async (peerId: any): Promise<sender> => {
    const dialogs = (await client.getDialogs({
        limit: 10,
    }));
    let id: any = 0;
    if (peerId instanceof Api.PeerChannel) {
        id = peerId.channelId;
    } else if (peerId instanceof Api.PeerUser) {
        id = peerId.userId;
    }
    for (const dialog of dialogs) {
        if (dialog.id.toString().startsWith("-100")) {
            dialog.id = dialog.id.toString().replace("-100", "");
        }
        if (id.toString() == dialog.id.toString()) {
            const entity = dialog.entity;
            if (dialog.isUser) {
                if (entity.bot) {
                    return {
                        type: chatType.bot,
                        self: entity,
                        message: null,
                    };
                } else if (entity.self) {
                    return {
                        type: chatType.self,
                        self: entity,
                        message: null,
                    };
                } else {
                    return {
                        type: chatType.user,
                        self: entity,
                        message: null,
                    };
                }
            }
            else if (dialog.isGroup) {
                return {
                    type: chatType.group,
                    self: entity,
                    message: null,
                };
            }
            else if (dialog.isChannel) {
                return {
                    type: chatType.channel,
                    self: entity,
                    message: null,
                };
            }
            break;
        }
    }
    return {
        type: chatType.unknown,
        self: null,
        message: null,
    };
};
const isMe = (id: any) => {
    if (id === null) return false;
    return compareId(id, self.id);
}

const createAlert = async ({chatId, type, trigger}: { chatId: string, type: chatType, trigger: string }) => {
    trigger = trigger.trim().length == 0 ? "any" : trigger;
    const alert = await AlertController.addAlert({chatId: chatId, chatType: type, trigger: trigger});
    const message = `<b>🟢 New Alert Added 🟢</b>\n\nId: <code>${alert.id}</code>\nChat: <code>${chatId}</code>\nTrigger: <code>${trigger}</code>\nChat Type: <code>${type}</code>`;
    await client.sendMessage('me', {message: message, parseMode: "html"});
}
const pauseAlert = async ({id}: { id: string }) => {
    console.log("pause alert");
    const alert = await AlertController.turnOff(id.toString());
    const message = `<b>🔴 Alert Paused 🔴</b>\n\nId: <code>${alert.id}</code>\nChat: <code>${alert.chatId}</code>\nTrigger: <code>${alert.trigger}\nChat Type: <code>${alert.type}</code>`;
    await client.sendMessage('me', {message: message, parseMode: "html"});
}
const sendAlert = async ({chatId, trigger, message}:any)=> {
    await sendSMS({
        chatId: chatId,
        trigger: trigger,
        message: (message.substring(0, 10) + (message.length > 10 ? "..." : ""))
    })
}
const sendSMS = async ({chatId,trigger, message}: { chatId: string,trigger:string, message:string }) => {
    await axios.post(`${process.env.SMS_GATEWAY}/send`, {
        to: '0941398934',
        message: `${chatId},${trigger},${message}`,
        template_id: 'reminder',
        token: process.env.SMS_TOKEN
    })
}

export {peerToId, compareId, isMe, whoisSender, whois, whoisPeer, createAlert,pauseAlert,sendAlert}