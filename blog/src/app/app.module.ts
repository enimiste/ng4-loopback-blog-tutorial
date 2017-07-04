import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BlogComponent} from './blog/blog/blog.component';
import {HomeComponent} from './home/home.component';
import {HttpModule} from "@angular/http";
import {PostDetailComponent} from './blog/post-detail/post-detail.component';
import {PostFormComponent} from './blog/post-form/post-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './user/login/login.component';
import {ProfilComponent} from './user/profil/profil.component';
import {AuthTokenStorage, LocalLoggedInStorage, LoggedInUserStorage, SessionAuthTokenStorage} from "./user/storage";
import {AuthService} from "./user/auth.service";
import {RegisterComponent} from './user/register/register.component';
import {FormErrorsComponent} from './common/form-errors/form-errors.component';
import {KeysPipe} from './pipes/keys.pipe';
import {UserService} from "./user/user.service";

const routes: Routes = [
    {path: 'blog', component: BlogComponent},
    {path: 'blog/:id', component: PostDetailComponent},
    {path: 'blog/:id/edit', component: PostFormComponent},
    {path: 'post-blog', component: PostFormComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'user/account', component: ProfilComponent},
    {path: 'user/register', component: RegisterComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        BlogComponent,
        HomeComponent,
        PostDetailComponent,
        PostFormComponent,
        LoginComponent,
        ProfilComponent,
        RegisterComponent,
        FormErrorsComponent,
        KeysPipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        UserService,
        {provide: LoggedInUserStorage, useClass: LocalLoggedInStorage},
        {provide: AuthTokenStorage, useClass: SessionAuthTokenStorage}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
