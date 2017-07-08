import {Headers} from '@angular/http';

export class Config {
    static serverUrl: string = 'http://localhost:3000/api/';
    static headers: Headers = new Headers({
        'Accept': 'application/json'
    });
    static currentUserKey: string = 'currentUser';
    static tokenKey: string = 'authToken';
    static paginationLimit = 10;
}