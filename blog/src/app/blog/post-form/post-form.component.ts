import {Component, OnInit} from '@angular/core';
import {Post} from "../post";
import {RestPostService, PostService} from "../post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Message, MessageType} from "../../common/flush/messages";
import {Config} from "../../common/config";
import {Title} from "@angular/platform-browser";
import {Category} from "../category-form/category.model";
import {CategoryService} from "../category.service";

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css'],
    providers: []
})
export class PostFormComponent implements OnInit {

    private post: Post = new Post();
    private flushs: Message[] = [];
    private formBtnText: string = 'Create';
    private title: string = 'New Blog Post';
    private loadingPost: boolean = false;
    private postInitialBody: string;
    private categories: Category[] = [];

    constructor(private postService: PostService,
                private router: Router,
                private btitle: Title,
                private route: ActivatedRoute,
                private catService: CategoryService) {
    }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.route
                .params
                .switchMap((p: Params) => {
                    const id = p['id'];

                    if (typeof id != "undefined" && id != null) {
                        this.loadingPost = true;
                        this.title = 'Edit post : ' + id;
                        this.formBtnText = 'Update';
                        return this.postService.getPost(id);
                    } else return [];
                })
                .subscribe((post) => {
                    this.loadingPost = false;
                    this.post = post;
                    this.btitle.setTitle('Edit - ' + post.title.substr(0, 20));
                    this.postInitialBody = post.body;
                }, (err) => {
                    this.loadingPost = false;
                    this.flushs.push(Message.error(err));
                });
        } else {
            this.btitle.setTitle('New post');
        }

        this.catService
            .getCategories()
            .subscribe(cats => this.categories = cats, err => console.error(err));
    }

    onBodyChanged(body: string) {
        this.post.body = body;
    }

    onsubmit() {
        if (this.post.id) {
            this.postService
                .updatePost(this.post)
                .subscribe((res) => {
                    this.flushs.push(Message.success('Post updated'));
                    setTimeout(() => {
                        this.router.navigate(['/blog', res.id, 'view']);
                    }, 2000);
                }, (err) => {
                    this.flushs.push(Message.error(err));
                });
        } else {
            this.postService
                .createPost(this.post)
                .subscribe((res) => {
                    this.flushs.push(Message.success('Post created'));
                    setTimeout(() => {
                        this.router.navigate(['/blog', res.id, 'view']);
                    }, 2000);
                }, (err) => {
                    this.flushs.push(Message.error(err));
                });
        }
    }

}