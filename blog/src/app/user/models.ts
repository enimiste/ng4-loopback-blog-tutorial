export class LoggedInUser {

    constructor(public token: string,
                public user?: User) {
    }
}

export class User {
    constructor(public id: string,
                public email: string,
                public username: string) {

    }
}