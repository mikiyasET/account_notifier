import {client} from "./client";
import {Api} from "telegram";
import {parseID} from "telegram/Utils";

const deleteUserMessage = async (id: number, fromBoth = true) => {
    return await client.invoke(new Api.messages.DeleteMessages({
        revoke: fromBoth,
        id: [id],
    }));
}

const deleteChannelMessage = async (id: number, from: any) => {
    return await client.deleteMessages(from, [id], {
        revoke: true,
    });
}


export {deleteUserMessage, deleteChannelMessage};