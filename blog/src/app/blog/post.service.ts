import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Post} from "./post";
import {Config} from "../common/config";
import {AuthTokenStorage, LoggedInUserStorage} from "../user/storage";
import {LoggedInUser} from "../user/models";

export abstract class PostService {
    /**
     * All posts of all users
     * @param query
     */
    abstract getPosts(query?: PostQuery): Observable<Post[]>;

    /**
     * Post created by any user
     * @param id
     */
    abstract getPost(id: string): Observable<Post>;

    abstract countPosts();

    /**
     *Only posts created by the logged in user
     * @param query
     */
    abstract getCurrentUserPosts(query?: PostQuery): Observable<Post[]>;

    /**
     * Post created by the current logged in user
     * @param id
     */
    abstract getCurrentUserPost(id: string): Observable<Post>;

    /**
     * Should be attached to the current logged in user
     * @param post
     */
    abstract createPost(post: Post): Observable<any>;

    abstract updatePost(post: Post): Observable<any>;

    abstract countCurrentUserPosts();
}

@Injectable()
export class RestPostService extends PostService {
    constructor(private http: Http,
                private authToken: AuthTokenStorage,
                private userStorage: LoggedInUserStorage) {
        super();
    }

    getPosts(query?: PostQuery): Observable<Post[]> {
        let qs: string = '';
        if (query != null) {
            qs = '?filter=' + encodeURI(JSON.stringify(query));
        }
        const url = Config.serverUrl + 'Posts' + qs;

        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    getPost(id: string): Observable<Post> {
        const url = Config.serverUrl + 'Posts/' + id;
        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    countPosts() {
        const url = Config.serverUrl + 'Posts/count';
        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json().count)
            .catch(err => {
                return Observable.throw(err);
            });
    }

    getCurrentUserPosts(query?: PostQuery): Observable<Post[]> {
        let qs: string = '';
        if (query != null) {
            qs = '?filter=' + encodeURI(JSON.stringify(query));
        }
        let user = this.userStorage.getCurrentUser() as LoggedInUser;
        const url = Config.serverUrl + 'Accounts/' + user.user.id + '/posts' + qs;

        return this.http
            .get(url, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    getCurrentUserPost(id: string): Observable<Post> {
        let user = this.userStorage.getCurrentUser() as LoggedInUser;
        const url = Config.serverUrl + 'Accounts/' + user.user.id + '/posts/' + id;
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
        let user = this.userStorage.getCurrentUser() as LoggedInUser;
        let url = Config.serverUrl + 'Accounts/' + user.user.id + '/posts';
        return this.http
            .post(url, {
                title: post.title,
                body: post.body
            }, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    updatePost(post: Post): Observable<any> {
        let user = this.userStorage.getCurrentUser() as LoggedInUser;
        const url = Config.serverUrl + 'Accounts/' + user.user.id + '/posts/' + post.id;
        return this.http
            .put(url, {title: post.title, body: post.body}, {headers: Config.headers})
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    countCurrentUserPosts() {
        let user = this.userStorage.getCurrentUser() as LoggedInUser;
        const url = Config.serverUrl + 'Accounts/' + user.user.id + '/posts/count';
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
