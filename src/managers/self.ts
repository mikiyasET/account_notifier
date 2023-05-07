import sender from "../types/sender";
import {client} from "../client";
import {createAlert, pauseAlert, peerToId, whoisPeer} from "../utils/general";

const selfManager = async (data: sender) => {
    console.log("Self Manager")
    const message = data.message.message;
    const messageArray = message.toLowerCase().split(" ");
    const command = messageArray[0].slice(1).toLowerCase();
    const args = messageArray.slice(1);
    if (data.message.replyTo !== null) {
        const savedMessages = await client.getMessages("me", {
            limit: 10,
        });
        // savedMessages.forEach(async (msg: any) => {
        for (const msg of savedMessages) {
            if (data.message.replyTo.replyToMsgId === msg.id) {
                const forwardMessageFrom = msg.fwdFrom;
                const forwardedId = peerToId(forwardMessageFrom.fromId);
                const who = whoisPeer(forwardMessageFrom.fromId);
                if (forwardedId !== 0) {
                    if (command === process.env.ALERT_COMMAND) {
                        await createAlert({
                            chatId: forwardedId.toString(),
                            type: who.type,
                            trigger: args.join(" "),
                        })
                    } else if (command === "stopalert") {
                        await pauseAlert({id: forwardedId.toString()})
                    }
                }
            }
        }
    }
    else {
        console.log("Not a reply")
    }
}

export default selfManager;