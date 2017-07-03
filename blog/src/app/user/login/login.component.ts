import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Message, MessageType} from "../../common/messages";
import {Router} from "@angular/router";
import {LoggedInUser} from "../models";
import {AuthTokenStorage, LoggedInUserStorage} from "../storage";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: []
})
export class LoginComponent implements OnInit {
    private message: Message = Message.None();

    constructor(private loginService: AuthService,
                private router: Router,
                private userStorage: LoggedInUserStorage,
                private authTokenStorage: AuthTokenStorage) {
    }

    ngOnInit() {
    }

    onLoginFormClicked(username, password) {
        this.loginService
            .login(username, password)
            .subscribe((user: LoggedInUser) => {
                this.message = new Message(MessageType.SUCCESS, 'Logged In');
                this.userStorage.setUser(user.user)
                    .then(() => {
                        return this.authTokenStorage.setToken(user.token);
                    })
                    .then(() => {
                        setTimeout(() => {
                            this.router.navigate(['/user/account']);
                        }, 2000);
                    })
                    .catch((err) => {
                        this.message = new Message(MessageType.ERROR, err);
                    });
            }, (err) => {
                this.message = new Message(MessageType.ERROR, err);
            });
    }

}
