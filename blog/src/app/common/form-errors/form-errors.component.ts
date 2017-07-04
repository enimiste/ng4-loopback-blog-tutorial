import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ValidationErrors} from "@angular/forms";

@Component({
    selector: 'form-errors',
    templateUrl: './form-errors.component.html',
    styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() messages: { [key: string]: string; };
    @Input() inputName: string;
    @Input() isPassword: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
