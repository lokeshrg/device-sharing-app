import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BookingComponent } from 'src/app/booking/booking.component';
import { ReturnComponent } from 'src/app/return/return.component';

const routes: Routes = [
  //{ path: 'home', component: AppComponent, redirectTo: '/'},
  { path: 'bookd', component: BookingComponent, data: {device:'Galaxy S9', status:'no', user:'Shiva'} },
  { path: 'returnd', component: ReturnComponent, data: {device:'Galaxy S9', status:'yes'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
