import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
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
import {AppRoutingModule} from "./app-routing.module";
import {FlushComponent} from './common/flush/flush.component';
import {RestPostService, PostService} from "./blog/post.service";
import {PostsListComponent} from './blog/posts-list/posts-list.component';
import {UserPostsComponent} from './user/user-posts/user-posts.component';
import {TinymceEditorComponent} from './common/tinymce-editor/tinymce-editor.component';
import {CategoryFormComponent} from './blog/category-form/category-form.component';
import {CategoryService} from "./blog/category.service";
import { CategoryListComponent } from './blog/category-list/category-list.component';

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
        KeysPipe,
        FlushComponent,
        PostsListComponent,
        UserPostsComponent,
        TinymceEditorComponent,
        CategoryFormComponent,
        CategoryListComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [
        AuthService,
        UserService,
        {provide: LoggedInUserStorage, useClass: LocalLoggedInStorage},
        {provide: AuthTokenStorage, useClass: SessionAuthTokenStorage},
        {provide: PostService, useClass: RestPostService},
        CategoryService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
