import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Category} from "./category-form/category.model";
import {Http} from "@angular/http";
import {Config} from "../common/config";

@Injectable()
export class CategoryService {

    constructor(private http: Http) {
    }

    create(title: string, description: string): Observable<Category> {
        const url = Config.serverUrl + 'Categories';
        return this.http
            .post(url, {
                title: title, description: description
            }, {headers: Config.headers})
            .map(res => res.json() as Category)
            .catch(err => Observable.throw(err));
    }
}
