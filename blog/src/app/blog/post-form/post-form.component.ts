import {Component, OnInit} from '@angular/core';
import {Post} from "../post";
import {PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css'],
    providers: [PostService]
})
export class PostFormComponent implements OnInit {

    private post: Post = new Post();
    private message: Message = Message.None();
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
                    this.message = new Message(MessageType.ERROR, err);
                }, () => this.loading = false);
        }
    }

    onsubmit() {
        if (this.post.id) {
            this.postService
                .updatePost(this.post)
                .subscribe((res) => {
                    this.message = new Message(MessageType.SUCCESS, 'Post updated');
                    setTimeout(() => {
                        this.router.navigate(['/blog', res.id]);
                    }, 1000);
                }, (err) => {
                    this.message = new Message(MessageType.ERROR, err);
                });
        } else {
            this.postService
                .createPost(this.post)
                .subscribe((res) => {
                    this.message = new Message(MessageType.SUCCESS, 'Post created');
                    setTimeout(() => {
                        this.router.navigate(['/blog', res.id]);
                    }, 1000);
                }, (err) => {
                    this.message = new Message(MessageType.ERROR, err);
                });
        }
    }

}

enum MessageType {
    NONE = -1,
    ERROR = 0,
    SUCCESS = 1,
}
class Message {
    constructor(public type: MessageType, public message: string | null) {
    }

    static None() {
        return new Message(MessageType.NONE, null);
    }

    isError() {
        return this.type == 0;
    }

    isSuccess() {
        return this.type == 1;
    }
}