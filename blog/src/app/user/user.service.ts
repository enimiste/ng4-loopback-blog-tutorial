import {Injectable} from '@angular/core';
import {User} from "./models";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

    constructor() {
    }


    register(user: User): Observable<any> {
        return Observable.throw('Not implemented');
    }
}
