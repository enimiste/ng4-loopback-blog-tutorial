import {Component, OnInit} from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Message, MessageType} from "../../common/flush/messages";
import {Config} from "../../common/config";

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css'],
    providers: [PostService]
})
export class PostFormComponent implements OnInit {

    private post: Post = new Post();
    private flushs: Message[] = [];
    private formBtnText: string = 'Create';
    private title: string = 'New Blog Post';
    private loading: boolean = false;

    constructor(private postService: PostService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.route
                .params
                .switchMap((p: Params) => {
                    const id = p['id'];

                    if (typeof id != "undefined" && id != null) {
                        this.loading = true;
                        this.title = 'Edit post : ' + id;
                        this.formBtnText = 'Update';
                        return this.postService.getPost(id);
                    } else return [];
                })
                .subscribe((post) => {
                    this.post = post;
                }, (err) => {
                    this.flushs.push(new Message(MessageType.ERROR, err));
                }, () => this.loading = false);
        }
    }

    onsubmit() {
        console.log(Config.headers.toJSON());
        if (this.post.id) {
            this.postService
                .updatePost(this.post)
                .subscribe((res) => {
                    this.flushs.push(new Message(MessageType.SUCCESS, 'Post updated'));
                    setTimeout(() => {
                        this.router.navigate(['/blog', res.id]);
                    }, 2000);
                }, (err) => {
                    this.flushs.push(new Message(MessageType.ERROR, err));
                });
        } else {
            this.postService
                .createPost(this.post)
                .subscribe((res) => {
                    this.flushs.push(new Message(MessageType.SUCCESS, 'Post created'));
                    setTimeout(() => {
                        this.router.navigate(['/blog', res.id]);
                    }, 2000);
                }, (err) => {
                    this.flushs.push(new Message(MessageType.ERROR, err));
                });
        }
    }

}