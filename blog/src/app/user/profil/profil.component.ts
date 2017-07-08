import {Component, OnInit} from '@angular/core';
import {LoggedInUser, IdentifiedUser} from "../models";
import {LoggedInUserStorage} from "../storage";
import {AuthService} from "../auth.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    private user: IdentifiedUser = null;

    constructor(private userStorage: LoggedInUserStorage,
                private btitle: Title,
                private authService: AuthService) {
        authService.loggedIn.subscribe((user: LoggedInUser | null) => {
            if (!user) this.user = null;
            else this.user = Object.assign({}, user.user);//to avoid mutability
        });
    }

    ngOnInit() {
        this.btitle.setTitle('My Profile');
        let currentUser = this.userStorage
            .getCurrentUser();
        if (currentUser != null) {
            this.user = currentUser.user;
        }
    }

}
