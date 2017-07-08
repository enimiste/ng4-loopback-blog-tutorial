import {Component, OnInit} from '@angular/core';
import {Message} from "../../common/flush/messages";
import {RulesMessages} from "../../common/form-errors/rulemessage.model";
import {FormBuilder, FormGroup, Validators as V} from "@angular/forms";
import {CategoryService} from "../category.service";
import {Category} from "./category.model";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

    private form: FormGroup;
    private flushs: Message[] = [];
    private messages: { [key: string]: RulesMessages };

    constructor(private fb: FormBuilder,
                private catService: CategoryService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            title: this.fb.control(null, [V.required, V.minLength(10)]),
            description: this.fb.control(null, [V.required, V.minLength(10)]),
        });

        this.messages = {
            title: (new RulesMessages({}))
                .add('required', 'Champs obligatoire')
                .add('minlength', 'Minimum de caractere est 10.'),
            description: new RulesMessages({
                required: 'Champs obligatoire',
                minlength: 'Minimum de caractere est 10.'
            })
        };
    }

    onSubmit() {
        if (this.form.valid) {
            this.catService
                .create(this.form.controls.title.value, this.form.controls.title.value)
                .subscribe((cat: Category) => {
                    this.flushs.push(Message.success('Category created'));
                }, err => this.flushs.push(Message.error(err)));
        }
    }

}
