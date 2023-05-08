import {compareId, peerToId, sendAlert} from "../utils/general";
import {AlertController} from "../controller/alertController";

const Manager = async (data:any) => {

    console.log("Messages from all")
    const message = data.message;
    const messageTo = peerToId(message.peerId);
    const messageId = message.id;
    const messageText = message.message.toString();
    const messageFrom = peerToId(message.fromId);
    const nameUsername = `${data.self.firstName} (${data.self.username ?? messageFrom})`;
    const alerts = await AlertController.getOn();
    if (alerts.length > 0) {
        for (const alert of alerts) {
            if (compareId(alert.chatId, messageFrom)) {
                // console.log(`Alert from ${messageFrom}`)
                if (alert.trigger == "any" || messageText.toLowerCase().includes(alert.trigger.toLowerCase())) {
                    console.log(`Alert from ${messageFrom} message ${messageText}`);
                    await sendAlert({
                        name: nameUsername.toString(),
                        trigger: alert.trigger,
                        message: messageText,
                    });
                }
            }
        }
    }
}
export default Manager;