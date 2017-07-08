import {IdentifiedUser} from "../user/models";
export class Post {
    constructor(public id?: string,
                public title?: string,
                public body?: string,
                public account?: IdentifiedUser,
                public accountId?: string) {
    }
}