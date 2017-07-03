import {Component, OnInit} from '@angular/core';
import {AuthTokenStorage, LoggedInUserStorage} from "./user/storage";
import {AuthService} from "./user/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    loggedIn: boolean = false;
    username: string = 'Your username';

    constructor(private userStorage: LoggedInUserStorage,
                private authTokenStorage: AuthTokenStorage,
                private authService: AuthService,
                private router: Router) {

    }

    ngOnInit(): void {
        const token = this.authTokenStorage.getToken();
        const user = this.userStorage.getCurrentUser();
        if (token != null && user != null) {
            this.loggedIn = true;
            this.username = user.username;

        } else
            console.log('Token not found');
    }

    onLogoutClicked() {
        this.authService.logout()
            .subscribe(() => {
                this.router.navigate(['/home']);

            });
    }
}
