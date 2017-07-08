import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Message, MessageType} from "../../common/flush/messages";
import {Router} from "@angular/router";
import {LoggedInUser} from "../models";
import {AuthTokenStorage, LoggedInUserStorage} from "../storage";
import {Config} from "../../common/config";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: []
})
export class LoginComponent implements OnInit {
    private flushs: Message[] = [];

    constructor(private loginService: AuthService,
                private router: Router,
                private btitle: Title,
                private userStorage: LoggedInUserStorage,
                private authTokenStorage: AuthTokenStorage) {
    }

    ngOnInit() {
        this.btitle.setTitle('Connextion');
    }

    onLoginFormClicked(username, password) {
        this.loginService
            .login(username, password)
            .subscribe((user: LoggedInUser) => {
                this.flushs.push(Message.success('Logged In'));
                this.userStorage.setUser(user);
                Config.headers.append('Authorization', user.token);
                this.authTokenStorage.setToken(user.token);
                setTimeout(() => {
                    this.router.navigate(['/user/account']);
                }, 1000);
            }, (err) => {
                this.flushs.push(Message.error(err));
            });
    }

}
