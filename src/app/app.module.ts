import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HomeComponent } from "./ui/home/home.component";
import { ContactComponent } from "./ui/contact/contact.component";
import { ShowcaseComponent } from "./ui/showcase/showcase.component";
import { BucketListComponent } from "./ui/showcase/bucketlist/bucketlist.component";
import { GitComponent } from "./ui/git/git.component";

import { GitService } from "./ui/git/git.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    ShowcaseComponent,
    GitComponent,
    BucketListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB3u-Gzcds2RawF_HLPOmmWHPFojFms6aE",
      libraries: ["places"]
    })
  ],
  providers: [GitService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
