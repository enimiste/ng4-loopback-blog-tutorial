import {Component, OnInit} from '@angular/core';
import {Post} from "../post";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../post.service";
import "rxjs/add/operator/switchMap";
import {Title} from "@angular/platform-browser";
import {LoggedInUser} from "../../user/models";
import {AuthService} from "../../user/auth.service";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css'],
    providers: []
})
export class PostDetailComponent implements OnInit {

    private post: Post = new Post();
    private loggedIn: boolean = false;
    private user: LoggedInUser;

    constructor(private route: ActivatedRoute,
                private btitle: Title,
                private postService: PostService,
                private authService: AuthService) {
        authService.loggedIn.subscribe((user: LoggedInUser | null) => {
            this.loggedIn = !user;
            this.user = user;
        });
        this.loggedIn = this.authService.isLoggedIn();
        this.user = this.authService.currentUser();
    }

    ngOnInit() {
        this.route
            .params
            .switchMap((p: Params) => {
                const id = p['id'];
                return this.postService.getPost(id);
            })
            .subscribe((post: Post) => {
                    this.post = post;
                    this.btitle.setTitle('View - ' + post.title.substr(0, 20));
                }
                , err => console.log(err));
    }

    canEdit(p: Post): boolean {
        return p.accountId == this.user.user.id;
    }
}
