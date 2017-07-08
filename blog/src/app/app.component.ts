import {Component, OnInit} from '@angular/core';
import { LoggedInUserStorage} from "./user/storage";
import {AuthService} from "./user/auth.service";
import {Router} from "@angular/router";
import {Config} from "./common/config";
import {LoggedInUser, IdentifiedUser} from "./user/models";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {PostService} from "./blog/post.service";
import {Post} from "app/blog/post";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    user: IdentifiedUser = null;
    private searchTerm: Subject<string> = new Subject<string>();
    private results: Post[] = [];

    constructor(private userStorage: LoggedInUserStorage,
                private authService: AuthService,
                private postService: PostService,
                private router: Router) {
        authService.loggedIn.subscribe((user: LoggedInUser | null) => {
            if (!user) this.user = null;
            else this.user = Object.assign({}, user.user);//to avoid mutability
        });

        this.searchTerm.debounceTime(300)
            .distinctUntilChanged()
            .subscribe((q) => {
                this.postService.search(q)
                    .subscribe((posts: Post[]) => {
                        console.log(posts);
                        this.results = posts;
                    }, (err) => {
                        console.error(err);
                    });
            });
    }

    ngOnInit(): void {
        const user = this.userStorage.getCurrentUser();
        if (user) {
            this.user = Object.assign({}, user.user);//to avoid mutability
            Config.headers.append('Authorization', user.token);
        } else {
            this.user = null;
        }
    }

    onLogoutClicked(e: Event) {
        e.preventDefault();
        this.authService.logout()
            .subscribe(() => {
                this.router.navigate(['/user/login']);
            }, (err) => console.info({'err': err}));
    }

    typing(q: string) {
        this.searchTerm.next(q);
    }

    showDetail(id: string) {
        this.router.navigate(['/blog', id, 'view']).then(() => {
            this.searchTerm.next('');
        })
    }
}
