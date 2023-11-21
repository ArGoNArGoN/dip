export interface Contact {
    readonly id: number;
    readonly firstPhone: string;
    readonly secondPhone?: string;
}

export interface SetContact {
    readonly contactId?: number;
    contact?: Contact;

    setContact(contacts: Array<Contact>): void;
}
