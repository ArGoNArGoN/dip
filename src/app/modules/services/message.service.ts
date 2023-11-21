import {AbstractMessageService} from "../infrastructure-services/abstract-message.service";
import {Message} from "../infrastructure-models/message/message.interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class MessageService extends AbstractMessageService {
    constructor(
        private readonly messageService: MatSnackBar,
    ) {
        super();
    }

    public error(message: Message): void {
        this.sendMessage(message);
    }

    private sendMessage(message: Message, duration: number = 0): void {
        const title: string = message.message ? `${message.title}\n${message.message}` : message.title;
        this.messageService.open(title, undefined, {duration});
    }
}
