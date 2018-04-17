import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ui/home/home.component';
import { ContactComponent } from './ui/contact/contact.component';
import { ShowcaseComponent } from './ui/showcase/showcase.component';
import { BucketListComponent } from './ui/showcase/bucketlist/bucketlist.component';
import { TriviaComponent } from './ui/showcase/trivia/trivia.component';
import { GitComponent } from './ui/git/git.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'git', component: GitComponent },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'showcase/bucketlist', component: BucketListComponent },
  { path: 'showcase/trivia', component: TriviaComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
