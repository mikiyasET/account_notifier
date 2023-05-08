import {Api, TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";
// @ts-ignore
import input from "input";
import {PrismaClient} from "@prisma/client";
const apiId = 6;
const apiHash = "eb06d4abfb49dc3eeb1aeb98ae0f581e";
const session = new StringSession("");
let client: TelegramClient | any;
let self: any;
let lastMessage: any;
let prisma = new PrismaClient();
(async () => {
    client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 5,
        deviceModel: "CA Notification Service",
        appVersion: "Codeabay 1.0.0",
        systemVersion: "4.16.30-vxCodeabay",
    });
    await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () => await input.text("Please enter the code you received: "),
        onError: (err: any) => console.log(err),
    });
    // await client.invoke(new Api.auth.LogOut()); // uncomment this line to logout
    self = await client.getMe();
    console.log(client.session.save()); // -> copy session string to the StringSession("PASTE COPIED STRING HERE") on the session variable above ++++++ IMPORTANT ++++++
    console.log("Connected!");
})();

export {client,self,lastMessage,prisma};