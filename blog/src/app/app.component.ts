import {Component, OnInit} from '@angular/core';
import {AuthTokenStorage, LoggedInUserStorage} from "./user/storage";
import {AuthService} from "./user/auth.service";
import {Router} from "@angular/router";
import {Config} from "./common/config";
import {LoggedInUser, IdentifiedUser} from "./user/models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    user: IdentifiedUser = null;

    constructor(private userStorage: LoggedInUserStorage,
                private authTokenStorage: AuthTokenStorage,
                private authService: AuthService,
                private router: Router) {
        authService.loggedIn.subscribe((user: LoggedInUser | null) => {
            if (!user) this.user = null;
            else this.user = Object.assign({}, user.user);//to avoid mutability
        });
    }

    ngOnInit(): void {
        const user = this.userStorage.getCurrentUser();
        if (user) {
            this.user = Object.assign({}, user.user);//to avoid mutability
            Config.headers.append('Authorization', user.token);
        } else {
            this.user = null;
        }
    }

    onLogoutClicked(e: Event) {
        e.preventDefault();
        this.authService.logout()
            .subscribe(() => {
                this.router.navigate(['/user/login']);
            }, (err) => console.info({'err': err}));
    }
}
