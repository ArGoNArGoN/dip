import {Message} from "@infrastructure-models/message/message.interfaces";

export abstract class AbstractMessageService {
    public abstract error(message: Message): void;
}
