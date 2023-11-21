import {Injectable} from "@angular/core";
import {Message} from "../infrastructure-models/message/message.interfaces";

@Injectable({
    providedIn: 'root',
})
export abstract class AbstractMessageService {
    public abstract error(message: Message): void;
}
