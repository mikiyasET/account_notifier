import {NewMessage, NewMessageEvent} from "telegram/events";
let {lastMessage} = require("./client");
import selfManager from "./managers/self";
import userManager from "./managers/user";
import channelManager from "./managers/channel";
import groupManager from "./managers/group";
import botManager from "./managers/bot";
import outgoingManager from "./managers/outgoing";
import {whoisSender} from "./utils/general";
import {chatType} from "@prisma/client";
import {client, self} from "./client";
import manager from "./managers/manager";

const userBot = () => {

    const handleMessage = async (event: NewMessageEvent) => {
        const data = await whoisSender(event);
        let notFromSelf = true;
        if (data.message != null) {
            if (data.message.fromId == null) {
                notFromSelf = true;
            } else {
                notFromSelf = self.id.toString() != data.message.fromId.userId.toString();
            }
            if (data.type != chatType.unknown) {
                if (data.type == chatType.self) { // Message from saved messages
                    await selfManager(data);
                } else if (data.type == chatType.user && notFromSelf) { // Message from user
                    await userManager(data);
                } else if (data.type == chatType.channel && notFromSelf) { // message from channel
                    await channelManager(data);
                } else if (data.type == chatType.group && notFromSelf) { // message from group
                    await groupManager(data);
                } else if (data.type == chatType.bot && notFromSelf) { // message from bots
                    await botManager(data);
                } else { // probably message from you to others
                    await outgoingManager(data);
                }
                await manager(data);
            } else {
                console.log("Unknown Message");
            }
        }else {
            console.log("Not message")
        }
    }



    (async () => {
        client.addEventHandler(handleMessage, new NewMessage());
    })();
}

export default userBot;