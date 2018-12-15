import { Component, OnInit, ViewChild } from '@angular/core';
import {DeviceDetailsService} from '../../app/device-details.service';
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgModule }      from '@angular/core';

import {
  Router, ActivatedRoute //,Resolve, RouterStateSnapshot, ActivatedRouteSnapshot
}                                 from '@angular/router';
declare var Date;

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule
  ]
})
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  //@ViewChild('frm') form;
  router;
  route;
  deviceData;
  iData;
  deviceDetailsService;
  datepipe;
  model;
  bookedBy;
  datenow;
  constructor(deviceDetailsService: DeviceDetailsService, datepipe: DatePipe, router: Router, route:ActivatedRoute) {
    this.router = router;
    this.route = route;
    this.deviceDetailsService = deviceDetailsService;
    this.datepipe = datepipe;
    //deviceDetailsService.setDeviceDetails('Galaxy S9', 'no', 'Shiva', datepipe.transform(new Date(), 'yyyy-MM-dd'));
  }
  ngAfterViewInit(): void {
    /*console.log("After view init: ",this.form);
    this.bookedBy = this.form.bookedBy;
    this.datenow = this.form.datenow;
    console.log("AVI: by:", this.bookedBy, ", dt: ", this.datenow);*/
 }

  ngOnInit() {
    this.deviceData = this.route.params.subscribe(params => {
      this.iData = params;
      console.log("In Booking Component: ",params);
      });
      
      //console.log('this.deviceData: Book : ', this.deviceData);
  }

  updateDevices(){
    alert('updated device info!');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  public submitBForm(f: NgForm){
    //alert(2);
    let device = this.iData;
    let formData = f.value;
    //console.log('A: ',JSON.stringify( formData));
    console.log("Calling service to update local storage in Booking Component...");
    console.log(device.name, 'no', formData.requestingUser, this.datepipe.transform(formData.datenow, 'yyyy-MM-dd HH:mm'));
    this.deviceDetailsService.setDeviceDetails(device.name, 'no', formData.requestingUser, this.datepipe.transform(formData.datenow, 'yyyy-MM-dd HH:mm'));
    //this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm'));
    console.log("Navigating to home - device inventory page! From Booking Page");
    this.router.navigate(['']);
  }

  resetBForm(){
    console.log("Navigating to home - no action taken on Booking Page");
    this.router.navigate(['']);
  }
}
