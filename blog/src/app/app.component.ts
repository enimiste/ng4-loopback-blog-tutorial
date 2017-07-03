import {Component, OnInit} from '@angular/core';
import {AuthTokenStorage, LoggedInUserStorage} from "./user/storage";
import {User} from "./user/models";
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
        this.authTokenStorage
            .getToken()
            .then((token: string | null) => {
                if (token != null) {
                    this.userStorage.getCurrentUser()
                        .then((user: User | null) => {
                            if (user != null) {
                                this.loggedIn = true;
                                this.username = user.username;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else
                    console.log('Token not found');
            })
            .catch((err) => console.log(err));
    }

    onLogoutClicked() {
        this.authService.logout()
            .then((obs: Observable<any>) => {
                console.log('logged out 1');
                obs.subscribe((removeTokenPromise: Promise<any>) => {
                    console.log('logged out 2');
                    removeTokenPromise.then(() => {
                        console.log('token removed');
                        this.router.navigate(['/home']);
                    })
                        .catch((err) => console.log(err));
                });
            })
            .catch((err) => console.log(err));
    }
}
