///<reference path="./blog/post-form/post-form.component.ts"/>
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {BlogComponent} from "./blog/blog/blog.component";
import {PostDetailComponent} from "./blog/post-detail/post-detail.component";
import {PostFormComponent} from "./blog/post-form/post-form.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./user/login/login.component";
import {ProfilComponent} from "./user/profil/profil.component";
import {RegisterComponent} from "./user/register/register.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([
            {path: '', redirectTo: '/home', pathMatch: 'full'},
            {path: 'blog', component: BlogComponent},
            {path: 'blog/:id', component: PostDetailComponent},
            {path: 'blog/:id/edit', component: PostFormComponent},
            {path: 'post-blog', component: PostFormComponent},
            {path: 'home', component: HomeComponent},
            {path: 'user/login', component: LoginComponent},
            {path: 'user/account', component: ProfilComponent},
            {path: 'user/register', component: RegisterComponent}
        ])
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
