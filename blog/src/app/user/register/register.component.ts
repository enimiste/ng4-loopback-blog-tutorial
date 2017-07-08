import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators as V} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../models";
import {Message, MessageType} from "../../common/flush/messages";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {RulesMessages} from "../../common/form-errors/rulemessage.model";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    messages: { [key: string]: RulesMessages } = {};
    private flushs: Message[] = [];

    constructor(private fb: FormBuilder,
                private btitle: Title,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.btitle.setTitle('Registration');
        this.registerForm = this.fb.group({
            firstName: this.fb.control(null, [V.required, V.minLength(3), V.maxLength(20)]),
            lastName: this.fb.control(null, [V.required, V.minLength(3), V.maxLength(20)]),
            username: this.fb.control(null, [V.required, V.minLength(5), V.maxLength(20)]),
            email: this.fb.control(null, [V.required, V.email]),
            password: this.fb.control(null, [V.required, V.minLength(8)]),
        });

        this.messages = {
            firstName: new RulesMessages({
                required: "Required",
                minlength: "You should type at least 3 characters",
                maxlength: "You exceded 20 characters",
            }),
            lastName: new RulesMessages({
                required: "Required",
                minlength: "You should type at least 3 characters",
                maxlength: "You exceded 20 characters",
            }),
            username: new RulesMessages({
                required: "Required",
                minlength: "You should type at least 3 characters",
                maxlength: "You exceded 20 characters",
            }),
            email: new RulesMessages({
                required: "Required",
                email: "Invalid email format",
            }),
            password: new RulesMessages({
                required: "Required",
                minlength: "You should type at least 8 characters",
            }),
        };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const data = this.registerForm.value;
            const user = User.fromJson(data);
            this.userService
                .register(user, data.password)
                .subscribe(() => {
                    this.flushs.push(new Message(MessageType.SUCCESS, 'Account created'));
                    this.router.navigate(['user/login']);
                }, (err) => {
                    this.flushs.push(new Message(MessageType.ERROR, err));
                });
        }
    }
}
