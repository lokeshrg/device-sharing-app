import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AgGridModule } from 'ag-grid-angular';
import { BookingComponent } from './booking/booking.component';
import { DevicesComponent } from './devices/devices.component';
import { ReturnComponent } from './return/return.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

//import { NoopInterceptor } from './noop-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    DevicesComponent,
    ReturnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //AgGridModule.withComponents(null),
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
