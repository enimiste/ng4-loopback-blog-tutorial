import {Component, OnInit} from '@angular/core';
import {Post} from "../post";
import {ActivatedRoute, Params} from "@angular/router";
import {RestPostService} from "../post.service";
import "rxjs/add/operator/switchMap";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css'],
    providers: []
})
export class PostDetailComponent implements OnInit {

    private post: Post = new Post();

    constructor(private route: ActivatedRoute,
                private postService: RestPostService) {
    }

    ngOnInit() {
        this.route
            .params
            .switchMap((p: Params) => {
                const id = p['id'];
                return this.postService.getPost(id);
            })
            .subscribe((post: Post) => this.post = post, err => console.log(err));
    }

}
