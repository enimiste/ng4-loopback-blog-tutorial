import {LoggedInUser, User} from "./models";
import {Config} from "../common/config";
import {Injectable} from "@angular/core";

export abstract class LoggedInUserStorage {
    abstract setUser(user: LoggedInUser): any;

    abstract getCurrentUser(): LoggedInUser | null;

    abstract clearCurrentUser(): void;
}

export abstract class AuthTokenStorage {
    abstract setToken(token: string): any;

    abstract getToken(): string | null;

    abstract clearToken(): void;
}

@Injectable()
export class LocalLoggedInStorage implements LoggedInUserStorage {
    clearCurrentUser(): void {
        localStorage.removeItem(Config.currentUserKey);
    }

    getCurrentUser(): LoggedInUser | null {
        let json = localStorage.getItem(Config.currentUserKey);
        if (json != null) {
            return JSON.parse(json);
        } else
            return null;
    }

    setUser(user: LoggedInUser): any {
        localStorage.setItem(Config.currentUserKey, JSON.stringify(user));
    }

}


@Injectable()
export class SessionAuthTokenStorage implements AuthTokenStorage {
    clearToken(): any {
        sessionStorage.removeItem(Config.tokenKey);
    }

    setToken(token: string): any {
        sessionStorage.setItem(Config.tokenKey, JSON.stringify(token));
    }

    getToken(): string | null {
        let json = sessionStorage.getItem(Config.tokenKey);
        if (json != null) {
            return JSON.parse(json);
        } else
            return null;
    }
}