import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../post";
import {Pager} from "../pager";

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
    @Input() title: string = '';
    @Input() posts: Post[] = [];
    @Input() pager: Pager = {limit: 2, current: 0, reachedEnd: false, total: 0};
    @Input() loading: boolean = false;

    @Output() loadMore: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    loadMoreClicked() {
        this.loadMore.next();
    }

}
