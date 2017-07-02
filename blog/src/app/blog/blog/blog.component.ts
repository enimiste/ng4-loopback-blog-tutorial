import {Component, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    providers: [PostService]
})
export class BlogComponent implements OnInit {
    title: string = 'Blog page';
    posts: Post[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.postService
            .getPosts()
            .subscribe((posts: Post[]) => this.posts = posts, err => console.log(err));
    }

}
