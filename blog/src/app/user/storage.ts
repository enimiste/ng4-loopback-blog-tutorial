import {User} from "./models";
import {Config} from "../common/config";
import {Injectable} from "@angular/core";

export abstract class LoggedInUserStorage {
    abstract setUser(user: User): Promise<any>;
    abstract getCurrentUser(): Promise<User>;
}

export abstract class AuthTokenStorage {
    abstract setToken(token: string): Promise<any>;
    abstract getToken(): Promise<string>;
}

@Injectable()
export class LocalLoggedInStorage implements LoggedInUserStorage {
    getCurrentUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                let json = localStorage.getItem(Config.currentUserKey);
                if (json != null) {
                    const user = JSON.parse(json);
                    resolve(user);
                } else
                    return null;
            } catch (e) {
                reject(e);
            }
        });
    }

    setUser(user: User): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(Config.currentUserKey, JSON.stringify(user));
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

}


@Injectable()
export class SessionAuthTokenStorage implements AuthTokenStorage {
    setToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                sessionStorage.setItem(Config.tokenKey, JSON.stringify(token));
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                let json = sessionStorage.getItem(Config.tokenKey);
                if (json != null) {
                    const toekn = JSON.parse(json);
                    resolve(toekn);
                } else
                    return null;
            } catch (e) {
                reject(e);
            }
        });
    }
}