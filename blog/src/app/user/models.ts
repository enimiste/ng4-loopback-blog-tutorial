export class LoggedInUser {

    constructor(public token: string,
                public user?: IdentifiedUser) {
    }
}
export class User {
    private static none: User = User.fromJson({});

    constructor(public email: string,
                public username: string,
                public firstName: string,
                public lastName: string) {

    }

    /**
     * Create a new user from a json object containing the same keys
     * This help to avoid new IdentifiedUser(....)
     *
     * @param json
     * @returns {User}
     */
    static fromJson(json: {}): User {
        json = Object.assign({email: '', username: '', firstName: '', lastName: '',}, json);
        return new User(json['email'], json['username'], json['firstName'], json['lastName']);
    }

    static None() {
        return this.none;
    }
}

export class IdentifiedUser {
    private static none: IdentifiedUser = IdentifiedUser.fromJson({});

    constructor(public id: string,
                public email: string,
                public username: string,
                public firstName: string,
                public lastName: string) {

    }

    /**
     * Create a new user from a json object containing the same keys
     * This help to avoid new IdentifiedUser(....)
     *
     * @param json
     * @returns {IdentifiedUser}
     */
    static fromJson(json: {}): IdentifiedUser {
        json = Object.assign({id: '', email: '', username: '', firstName: '', lastName: '',}, json);
        return new IdentifiedUser(json['id'], json['email'], json['username'], json['firstName'], json['lastName']);
    }

    static None() {
        return this.none;
    }
}