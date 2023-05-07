import sender from "../types/sender";
import {createAlert, isMe, pauseAlert, peerToId, whois, whoisPeer} from "../utils/general";
import {client} from "../client";
import {Api} from "telegram";
import {deleteChannelMessage, deleteUserMessage} from "../core";
import {chatType} from "@prisma/client";
import {AlertController} from "../controller/alertController";

const outgoingManager = async (data: sender) => {
    const message = data.message;
    const messageTo = peerToId(message.peerId);
    const messageId = message.id;
    const messageText = message.message.toString();
    const messageFrom = peerToId(message.fromId);
    if (isMe(messageFrom)) {
        if (messageText.startsWith("/")) {
            const messageArray = messageText.toLowerCase().split(" ");
            const command = messageArray[0].slice(1);
            const args = messageArray.slice(1);
            const who = await whois(message.peerId);
            if (command === process.env.ALERT_COMMAND) {
                await createAlert({
                    chatId: messageTo.toString(),
                    type: who.type,
                    trigger: args.join(" "),
                })
            }else if (command === "stopalert") {
                await pauseAlert({id: messageTo.toString()})

            }
            if (who.type === chatType.user)
                await deleteUserMessage(messageId);
            else
                await deleteChannelMessage(messageId, message.peerId);
        }
    }
}

export default outgoingManager;