import {SetContact} from "../contact/contact.interfaces";

export interface Patient extends SetContact {
    readonly lastName: string;
    readonly firstName: string;
    readonly patronymic?: string;
}
