import {Component, OnInit} from '@angular/core';
import {LoggedInUser, User} from "../models";
import {LoggedInUserStorage} from "../storage";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    private user: User = User.None();

    constructor(private userStorage: LoggedInUserStorage) {
    }

    ngOnInit() {
        this.userStorage
            .getCurrentUser()
            .then((user: User) => {
                this.user = user;
            })
            .catch((err) => console.error(err));
    }

}