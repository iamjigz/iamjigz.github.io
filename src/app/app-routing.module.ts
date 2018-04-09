import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ui/home/home.component';
import { AboutComponent } from './ui/about/about.component';
import { ShowcaseComponent } from './ui/showcase/showcase.component';
import { GitComponent } from './ui/git/git.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'git', component: GitComponent },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
