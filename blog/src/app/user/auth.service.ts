import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Config} from "../common/config";
import {LoggedInUser, User} from "./models";

@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<LoggedInUser> {
        return this.http
            .post(Config.serverUrl + 'Users/login?include=user', {
                username: username, password: password
            }, {headers: Config.headers})
            .map((res) => {
                const json = res.json();
                return new LoggedInUser(json.id,
                    new User(json.user.id, json.user.email, json.user.username));
            })
            .catch((err) => Observable.throw(err));
    }

    logout(token: string): Observable<any> {
        return null;
    }
}
