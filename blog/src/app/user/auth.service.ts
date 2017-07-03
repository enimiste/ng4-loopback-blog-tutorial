import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Config} from "../common/config";
import {LoggedInUser} from "./models";

@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<LoggedInUser> {
        return this.http
            .post(Config.serverUrl + 'Users/login', {
                username: username, password: password
            }, {headers: Config.headers})
            .map((res) => {
                const json = res.json();
                return new LoggedInUser(json.id, json.userId, json.created, json.ttl);
            })
            .catch((err) => Observable.throw(err));
    }

    logout(user: LoggedInUser): Observable<any>{
        return null;
    }
}
