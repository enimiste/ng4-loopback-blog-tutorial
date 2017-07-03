import {User} from "./models";
import {Config} from "../common/config";
import {Injectable} from "@angular/core";

export abstract class LoggedInUserStorage {
    abstract setUser(user: User): any;

    abstract getCurrentUser(): User | null;
}

export abstract class AuthTokenStorage {
    abstract setToken(token: string): any;

    abstract getToken(): string | null;

    abstract clearToken(): void;
}

@Injectable()
export class LocalLoggedInStorage implements LoggedInUserStorage {
    getCurrentUser(): User | null {
        let json = localStorage.getItem(Config.currentUserKey);
        if (json != null) {
            return JSON.parse(json);
        } else
            return null;
    }

    setUser(user: User): any {
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