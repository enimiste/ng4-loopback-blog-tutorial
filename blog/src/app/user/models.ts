export class LoggedInUser {

    constructor(public token: string,
                public user?: User) {
    }
}

export class User {
    private static none: User = new User('', '', '');

    constructor(public id: string,
                public email: string,
                public username: string) {

    }

    static None() {
        return this.none;
    }
}