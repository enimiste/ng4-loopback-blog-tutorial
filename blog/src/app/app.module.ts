import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BlogComponent} from './blog/blog/blog.component';
import {HomeComponent} from './home/home.component';
import {HttpModule} from "@angular/http";
import {PostDetailComponent} from './blog/post-detail/post-detail.component';
import {PostFormComponent} from './blog/post-form/post-form.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
    {path: 'blog', component: BlogComponent},
    {path: 'blog/:id', component: PostDetailComponent},
    {path: 'blog/:id/edit', component: PostFormComponent},
    {path: 'post-blog', component: PostFormComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        BlogComponent,
        HomeComponent,
        PostDetailComponent,
        PostFormComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
