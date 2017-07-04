import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators as V} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

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
    }

    onSubmit() {
        console.log(this.registerForm.value);
    }
}
