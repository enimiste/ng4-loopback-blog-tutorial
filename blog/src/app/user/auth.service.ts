import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Config} from "../common/config";
import {LoggedInUser, User} from "./models";
import {AuthTokenStorage, LoggedInUserStorage} from "./storage";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

    public loggedIn: Subject<LoggedInUser | null> = new Subject<LoggedInUser | null>();

    constructor(private http: Http,
                private authTokenStorage: AuthTokenStorage,
                private  userStorage: LoggedInUserStorage) {
        this.loggedIn.next(null);
        this.loggedIn.subscribe((v: LoggedInUser | null) => {
            if (v == null) {
                this.authTokenStorage.clearToken();
                this.userStorage.clearCurrentUser();
            }
        });
    }

    login(username: string, password: string): Observable<LoggedInUser> {
        return this.http
            .post(Config.serverUrl + 'Accounts/login?include=user', {
                username: username, password: password
            }, {headers: Config.headers})
            .map((res) => {
                const json = res.json();
                const loggedInUser = new LoggedInUser(json.id, User.fromJson(json.user));
                this.loggedIn.next(loggedInUser);
                return loggedInUser;
            })
            .catch((err) => Observable.throw(err));
    }

    logout(): Observable<void> {
        return this.http
            .post(Config.serverUrl + 'Accounts/logout', {}, {headers: Config.headers})
            .map((res) => {
                Config.headers.delete('Authorization');
                this.loggedIn.next(null);
            })
            .catch((err) => {
                this.loggedIn.next(null);
                return Observable.throw(err);
            });
    }
}
