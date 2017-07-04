import {Component, OnInit} from '@angular/core';
import {LoggedInUser, User} from "../models";
import {LoggedInUserStorage} from "../storage";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    private user: User = null;

    constructor(private userStorage: LoggedInUserStorage,
                private authService: AuthService) {
        authService.loggedIn.subscribe((user: LoggedInUser | null) => {
            this.user = Object.assign({}, user.user);//to avoid mutability
        });
    }

    ngOnInit() {
        this.user = this.userStorage
            .getCurrentUser();
    }

}
