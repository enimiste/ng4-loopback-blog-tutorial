import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {RulesMessages} from "./rulemessage.model";

@Component({
    selector: 'app-form-errors',
    templateUrl: './form-errors.component.html',
    styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() messages: RulesMessages;
    @Input() inputName: string;
    @Input() isPassword: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
