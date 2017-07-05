import {Injectable} from '@angular/core';
import {User} from "./models";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Config} from "../common/config";

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }


    register(user: User, password: string): Observable<any> {
        return this.http
            .post(Config.serverUrl + 'Accounts', Object.assign(user, {password: password}), {headers: Config.headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }
}
