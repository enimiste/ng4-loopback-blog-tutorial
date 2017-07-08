import {Component, OnInit} from '@angular/core';
import {Post} from "../post";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../post.service";
import "rxjs/add/operator/switchMap";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css'],
    providers: []
})
export class PostDetailComponent implements OnInit {

    private post: Post = new Post();

    constructor(private route: ActivatedRoute,
                private btitle: Title,
                private postService: PostService) {
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

}
