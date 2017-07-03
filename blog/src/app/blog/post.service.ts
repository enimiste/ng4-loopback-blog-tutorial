import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Post} from "./post";
import {Config} from "../common/config";
import {AuthTokenStorage} from "../user/storage";

@Injectable()
export class PostService {
    constructor(private http: Http,
                private authToken: AuthTokenStorage) {
    }

    getPosts(query?: PostQuery): Observable<Post[]> {
        let qs: string = '';
        if (query != null) {
            qs = '?filter=' + encodeURI(JSON.stringify(query));
        }
        const url = Config.serverUrl + 'posts' + qs;

        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    getPost(id: string): Observable<Post> {
        const url = Config.serverUrl + 'posts/' + id;
        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    createPost(post: Post): Observable<any> {
        const token = this.authToken
            .getToken();
        return this.http
            .post(Config.serverUrl + 'posts', {
                title: post.title,
                body: post.body
            }, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    updatePost(post: Post): Observable<any> {
        const url = Config.serverUrl + 'posts/' + post.id;
        return this.http
            .put(url, {title: post.title, body: post.body}, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    countPosts() {
        const url = Config.serverUrl + 'posts/count';
        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json().count)
            .catch(err => {
                return Observable.throw(err);
            });
    }
}

export interface PostQuery {
    limit: number;
    skip: number;
}
