export enum MessageType {
    NONE = -1,
    ERROR = 0,
    SUCCESS = 1,
}
export class Message {
    constructor(public type: MessageType, public message: string | null) {
    }

    static None() {
        return new Message(MessageType.NONE, null);
    }

    isError() {
        return this.type == 0;
    }

    isSuccess() {
        return this.type == 1;
    }
}