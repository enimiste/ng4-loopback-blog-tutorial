export class RulesMessages {
    constructor(public messages: { [key: string]: string; }) {
    }

    add(rule: string, msg: string): RulesMessages {
        this.messages[rule] = msg;

        return this;
    }

    get(rule: string): string {
        return this.messages[rule];
    }
}