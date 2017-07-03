import {LoggedInUser} from "./models";
import {Config} from "../common/config";
import {Injectable} from "@angular/core";

export abstract class LoggedInStorage {
    abstract setUser(user: LoggedInUser): Promise<any>;

    abstract getCurrentUser(): Promise<LoggedInUser>;

}

@Injectable()
export class LocalLoggedInStorage implements LoggedInStorage {
    getCurrentUser(): Promise<LoggedInUser> {
        return new Promise((resolve, reject) => {
            try {
                const user = JSON.parse(localStorage.getItem(Config.currentUserKey));
                resolve(user);
            } catch (e) {
                reject(e);
            }
        });
    }

    setUser(user: LoggedInUser): Promise<any> {
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