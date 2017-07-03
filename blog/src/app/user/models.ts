export class LoggedInUser {

    constructor(public token: string,
                public userId: string,
                public created: string,
                public ttl: string) {
    }
}