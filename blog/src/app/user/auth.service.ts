import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Config} from "../common/config";
import {LoggedInUser, User} from "./models";
import {AuthTokenStorage} from "./storage";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

    public loggedIn: Subject<boolean> = new Subject<boolean>();

    constructor(private http: Http,
                private authTokenStorage: AuthTokenStorage) {
        this.loggedIn.next(false);
    }

    login(username: string, password: string): Observable<LoggedInUser> {
        return this.http
            .post(Config.serverUrl + 'Users/login?include=user', {
                username: username, password: password
            }, {headers: Config.headers})
            .map((res) => {
                this.loggedIn.next(true);
                const json = res.json();
                return new LoggedInUser(json.id,
                    new User(json.user.id, json.user.email, json.user.username));
            })
            .catch((err) => Observable.throw(err));
    }

    logout(): Observable<void> {
        return this.http
            .post(Config.serverUrl + 'Users/logout', {}, {headers: Config.headers})
            .map((res) => {
                this.authTokenStorage.clearToken();
                Config.headers.delete('Authorization');
                this.loggedIn.next(false);
            })
            .catch((err) => Observable.throw(err));
    }
}
