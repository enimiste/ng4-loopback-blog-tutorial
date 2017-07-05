export enum MessageType {
    ERROR = 0,
    SUCCESS = 1,
    WARNING = 2,
    INFO = 3,
}
export class Message {
    constructor(public type: MessageType, public message: string | null) {
    }

    isError() {
        return this.type == 0;
    }

    isSuccess() {
        return this.type == 1;
    }

    isWarning() {
        return this.type == 2;
    }

    isInfo() {
        return this.type == 3;
    }
}