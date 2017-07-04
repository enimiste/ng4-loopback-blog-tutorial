import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators as V} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    messages: { [key: string]: { [key: string]: string }; } = {};

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            firstName: this.fb.control(null, [V.required, V.minLength(3), V.maxLength(20)]),
            lastName: this.fb.control(null, [V.required, V.minLength(3), V.maxLength(20)]),
            username: this.fb.control(null, [V.required, V.minLength(5), V.maxLength(20)]),
            email: this.fb.control(null, [V.required, V.email]),
            password: this.fb.control(null, [V.required, V.minLength(8)]),
        });

        this.messages = {
            firstName: {
                required: "Required",
                minlenght: "You should type at least 3 characters",
                maxlenght: "You exceded 20 characters",
            },
            lastName: {
                required: "Required",
                minlenght: "You should type at least 3 characters",
                maxlenght: "You exceded 20 characters",
            },
            username: {
                required: "Required",
                minlenght: "You should type at least 3 characters",
                maxlenght: "You exceded 20 characters",
            },
            email: {
                required: "Required",
                email: "Invalid email format",
            },
            password: {
                required: "Required",
                minlenght: "You should type at least 8 characters",
            },
        };
    }

    onSubmit() {
        console.log(this.registerForm.controls.username.errors);
    }
}
