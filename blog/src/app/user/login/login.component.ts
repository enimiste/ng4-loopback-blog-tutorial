import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Message, MessageType} from "../../common/messages";
import {Router} from "@angular/router";
import {LoggedInUser} from "../models";
import {LocalLoggedInStorage, LoggedInStorage} from "../storage";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService, {provide: LoggedInStorage, useClass: LocalLoggedInStorage}]
})
export class LoginComponent implements OnInit {
    private message: Message = Message.None();

    constructor(private loginService: AuthService,
                private router: Router,
                private storage: LoggedInStorage) {
    }

    ngOnInit() {
    }

    onLoginFormClicked(username, password) {
        this.loginService
            .login(username, password)
            .subscribe((user: LoggedInUser) => {
                this.message = new Message(MessageType.SUCCESS, 'Logged In');
                this.storage.setUser(user)
                    .then(() => {
                        setTimeout(() => {
                            this.router.navigate(['/home']);
                        }, 3000);
                    })
                    .catch((err) => {
                        this.message = new Message(MessageType.ERROR, err);
                    });
            }, (err) => {
                this.message = new Message(MessageType.ERROR, err);
            });
    }

}
