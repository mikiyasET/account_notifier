import {TelegramClient} from "telegram";
import {StringSession} from "telegram/sessions";
// @ts-ignore
import input from "input";
const apiId = 6;
const apiHash = "eb06d4abfb49dc3eeb1aeb98ae0f581e";
const session = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUHsKIGUugd9xt7iMX93EmKdAthcoKDqm/dE74fvDq3rgWdw6a0LulOUBDCZJwf/J4Hsql2+qDqYm/ZVzJOAjYRa6jL5rxUE9wl8U4BJqvlZ9c+yO7h4Wl/C3pGtzI5ELoGqy9inH0/9pYNt6gfXgaOvcUB6WcqC3TOT7sexP+go1qQb74ArfBwGAXQ8SgpsNPvlG+KuEfIOaoRN1sReE4fhsRVq/wbD+FCdxM4BTVEYjwsDNVBmPB0PfZRAdT9NsI8bOy/lmXvIiZayKSZrzP7QAKHIVQQXo/3S8uvGN6CM4p2gK3u0qXQH1vtsnvfbD+PzeMEN2heunlbnjTrI8hrc=");
let client: TelegramClient | any;
let self: any;

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
    self = await client.getMe();
    console.log("Connected!");
})();

export {client,self};