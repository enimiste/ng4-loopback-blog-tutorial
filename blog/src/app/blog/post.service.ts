import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Post} from "./post";

@Injectable()
export class PostService {
    private headers: Headers = new Headers({
        'Accept': 'application/json'
    });

    private serverUrl: string = 'http://localhost:3000/api/';

    constructor(private http: Http) {
    }

    getPosts(): Observable<Post[]> {
        const url = this.serverUrl + 'posts';

        return this.http
            .get(url, {headers: this.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    getPost(id: string): Observable<Post> {
        const url = this.serverUrl + 'posts/' + id;
        return this.http
            .get(url, {headers: this.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    createPost(post: Post): Observable<any> {
        const url = this.serverUrl + 'posts';
        return this.http
            .post(url, {title: post.title, body: post.body}, {headers: this.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    updatePost(post: Post): Observable<any> {
        const url = this.serverUrl + 'posts/' + post.id;
        return this.http
            .put(url, {title: post.title, body: post.body}, {headers: this.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }
}
