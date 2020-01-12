import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PostsComponent} from './components/posts/posts.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {AuthGuard} from './guards/auth.guard';
import {PostComponent} from './components/post/post.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'postItem/:id', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
