import {Component, OnInit} from '@angular/core';
import {Post} from "../../blog/post";
import {Pager} from "../../blog/pager";
import {PostQuery, PostService} from "../../blog/post.service";
import {Config} from "../../common/config";

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
    private title: string = 'My Posts';
    private posts: Post[] = [];
    private pager: Pager = {limit: Config.paginationLimit, current: 0, reachedEnd: false, total: 0};
    private loading: boolean = false;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.loadPosts();
        this.totalPosts();
    }

    loadPosts() {
        const query: PostQuery = {
            limit: this.pager.limit,
            skip: this.pager.limit * this.pager.current
        };
        this.postService
            .getCurrentUserPosts(query)
            .subscribe((posts: Post[]) => {
                if (typeof  posts != "undefined" && posts != null && posts.length > 0)
                    this.posts = this.posts.concat(posts);
                else
                    this.pager.reachedEnd = true;
            }, err => {
                console.log(err)
            }, () => this.loading = false);
    }

    totalPosts() {
        this.postService
            .countCurrentUserPosts()
            .subscribe((count: number) => {
                this.pager.total = count;
            }, err => {
                console.log(err)
            });
    }

    loadMorePosts() {
        this.pager.current++;
        this.loading = true;
        this.loadPosts();
        this.totalPosts();
    }
}
