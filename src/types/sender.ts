import {chatType} from "@prisma/client";

type sender = {
    type: chatType,
    self: any,
    message: any,
}

export default sender;