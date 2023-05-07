import {Api} from "telegram";
import {NewMessage, NewMessageEvent} from "telegram/events";
import senderType from "./constants/senderEnum";
import sender from "./types/sender";
import {client,self} from "./client";

const userBot = () => {

    const handleMessage = async (event: NewMessageEvent) => {
        const data = await whoisSender(event);
        let notFromSelf = true;
        if (data.message.fromId == null) {
            notFromSelf = true;
        }else {
            notFromSelf = self.id.toString() != data.message.fromId.userId.toString();
        }
        if (data.type != senderType.unknown) {
            if (data.type == senderType.self) { // Message from saved messages
                console.log("Self");
            } else if (data.type == senderType.user && notFromSelf) { // Message from user
                console.log("User");
            } else if (data.type == senderType.channel && notFromSelf) { // message from channel
                console.log("Channel");
            } else if (data.type == senderType.group && notFromSelf) { // message from group
                console.log("Group");
            } else if (data.type == senderType.bot && notFromSelf) { // message from bots
                console.log("Bot");
            } else { // probably message from you to others
                console.log("Message you sent");
            }
        } else {
            console.log("Unknown 2");
        }
    }



    (async () => {
        client.addEventHandler(handleMessage, new NewMessage());
    })();
    const whoisSender = async (event: any): Promise<sender> => {
        const dialogs = (await client.getDialogs({
            limit: 1,
        }))[0];
        let id = 0;
        if (event.message.peerId instanceof Api.PeerChannel) {
            id = event.message.peerId.channelId.value;
        } else if (event.message.peerId instanceof Api.PeerUser) {
            id = event.message.peerId.userId;
        }
        if (dialogs.id.toString().startsWith("-100")) {
            dialogs.id = dialogs.id.toString().replace("-100","");
        }
        if (id.toString() == dialogs.id.toString()) {
            const entity = dialogs.entity;
            if (dialogs.isUser) {
                if (entity.bot) {
                    return {
                        type: senderType.bot,
                        self: entity,
                        message: event.message,
                    };
                } else if (entity.self) {
                    return {
                        type: senderType.self,
                        self: entity,
                        message: event.message,
                    };
                } else {
                    return {
                        type: senderType.user,
                        self: entity,
                        message: event.message,
                    };
                }
            }
            else if (dialogs.isGroup) {
                return {
                    type: senderType.group,
                    self: entity,
                    message: event.message,
                };
            }
            else if (dialogs.isChannel) {
                return {
                    type: senderType.channel,
                    self: entity,
                    message: event.message,
                };
            }
        }
        return {
            type: senderType.unknown,
            self: null,
            message: null,
        };

    };
}

export default userBot;