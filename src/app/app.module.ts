import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {FrontendModule} from "./frontend/frontend.module";
import {ManagementportalModule} from "./managementportal/managementportal.module";
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
    ManagementportalModule,
    HttpClientModule
  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule {}