import {Component, Input, OnInit} from '@angular/core';
import {Message} from "./messages";

@Component({
    selector: 'app-flush',
    templateUrl: './flush.component.html',
    styleUrls: ['./flush.component.css']
})
export class FlushComponent implements OnInit {
    @Input() messages: Message[] = [];
    private alertTypes: { [key: number]: string } = {
        0: 'danger',
        1: 'success',
        2: 'warning',
        3: 'info'
    };

    constructor() {
    }

    ngOnInit() {
    }

    getAlterType(flush: Message) {
        return this.alertTypes[flush.type];
    }

}
