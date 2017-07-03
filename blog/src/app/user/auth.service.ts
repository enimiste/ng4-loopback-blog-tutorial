import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Config} from "../common/config";
import {LoggedInUser, User} from "./models";
import {AuthTokenStorage, LoggedInUserStorage} from "./storage";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

    public loggedIn: Subject<boolean> = new Subject<boolean>();

    constructor(private http: Http,
                private authTokenStorage: AuthTokenStorage,
                private  userStorage: LoggedInUserStorage) {
        this.loggedIn.next(false);
        this.loggedIn.subscribe((v: boolean) => {
            if (!v) {
                this.authTokenStorage.clearToken();
                this.userStorage.clearCurrentUser();
            }
        });
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
                Config.headers.delete('Authorization');
                this.loggedIn.next(false);
            })
            .catch((err) => Observable.throw(err));
    }
}
