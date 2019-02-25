import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {FrontendModule} from "./frontend/frontend.module";
import {ManagementPortalModule} from "./management-portal/management-portal.module";
import {HttpClientModule} from '@angular/common/http';
import {RoomService} from './services/rooms.service';
import {KamersPipe} from './shared/pipes/kamers.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FrontendModule,
    ManagementPortalModule,
    HttpClientModule
  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule {}
