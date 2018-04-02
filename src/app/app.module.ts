import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './ui/home/home.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FlexLayoutModule,
		MDBBootstrapModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
