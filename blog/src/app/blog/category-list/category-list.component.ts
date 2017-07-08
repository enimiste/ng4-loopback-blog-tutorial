import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";
import {Category} from "../category-form/category.model";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    private categories: Category[] = [];

    constructor(private catService: CategoryService) {
    }

    ngOnInit() {
        this.catService
            .getCategories()
            .subscribe((cats) => this.categories = cats, err => console.error(err));
    }

}
