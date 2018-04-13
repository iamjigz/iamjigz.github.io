import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './ui/home/home.component';
import { ContactComponent } from './ui/contact/contact.component';
import { ShowcaseComponent } from './ui/showcase/showcase.component';
import { GitComponent } from './ui/git/git.component';

import { GitService } from './ui/git/git.service';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent,
		ContactComponent,
		ShowcaseComponent,
		GitComponent
	],
	imports: [
    BrowserModule,
    HttpClientModule,
		AppRoutingModule,
		FlexLayoutModule,
		MDBBootstrapModule.forRoot(),
	],
	providers: [GitService],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
