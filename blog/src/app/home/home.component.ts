import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title: string = 'Home page';

    constructor(private btitle: Title) {
    }

    ngOnInit() {
        this.btitle.setTitle('Home');
    }

}
