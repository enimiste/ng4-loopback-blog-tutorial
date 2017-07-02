import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Post} from "./post";

@Injectable()
export class PostService {

    constructor(private http: Http) {
    }

    getPosts(): Observable<Post[]> {
        const url = 'http://localhost:3000/api/posts';
        const headers = new Headers({
            'Accept': 'application/json'
        });
        return this.http
            .get(url, {headers: headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    getPost(id: string): Observable<Post> {
        const url = 'http://localhost:3000/api/posts/' + id;
        const headers = new Headers({
            'Accept': 'application/json'
        });
        return this.http
            .get(url, {headers: headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }
}
