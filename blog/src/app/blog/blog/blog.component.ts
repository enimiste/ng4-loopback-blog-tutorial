import {Component, OnInit} from '@angular/core';
import {PostQuery, PostService} from "../post.service";
import {Post} from "../post";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    providers: [PostService]
})
export class BlogComponent implements OnInit {
    private title: string = 'Blog page';
    private posts: Post[] = [];
    private pager: Pager = {limit: 2, current: 0, reachedEnd: false, total: 0};
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
            .getPosts(query)
            .subscribe((posts: Post[]) => {
                if (typeof  posts != "undefined" && posts != null && posts.length > 0)
                    this.posts = this.posts.concat(posts);
                else
                    this.pager.reachedEnd = true;
            }, err => {
                console.log(err)
            }, ()=> this.loading = false);
    }

    totalPosts() {
        this.postService
            .countPosts()
            .subscribe((count: number) => {
                this.pager.total = count;
            }, err => {
                console.log(err)
            });
    }

    loadMoreClicked() {
        this.pager.current++;
        this.loading = true;
        this.loadPosts();
        this.totalPosts();
    }
}

interface Pager {
    limit: number;
    current: number;
    reachedEnd: boolean;
    total: number;
}