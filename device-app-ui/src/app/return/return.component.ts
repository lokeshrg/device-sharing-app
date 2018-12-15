import { Component, OnInit } from '@angular/core';
import { NgModule }      from '@angular/core';

import {DeviceDetailsService} from '../../app/device-details.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

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
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  router;
  route;
  deviceData;
  iData;
  deviceDetailsService;
  datepipe;
  public bookedBy;
  public datenow;
  constructor(deviceDetailsService: DeviceDetailsService, datepipe: DatePipe, router: Router, route:ActivatedRoute) {
    this.router = router;
    this.route = route;
    this.deviceDetailsService = deviceDetailsService;
    this.datepipe = datepipe;
    //deviceDetailsService.setDeviceDetails('Galaxy S9', 'no', 'Shiva', datepipe.transform(new Date(), 'yyyy-MM-dd'));
  }

  ngOnInit() {
    this.deviceData = this.route.params.subscribe(params => {
      this.iData = params;
      console.log("In Return Component: ",params);
      });
      //console.log('this.deviceData: Book : ', this.deviceData);
  }

  submitRForm(){
    let device = this.iData;
    //console.log(device.name, 'yes', undefined, undefined);
    console.log("Calling service to update local storage in Return Component...");
    this.deviceDetailsService.setDeviceDetails(device.name, 'yes', undefined, undefined);
    //this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm'));
    console.log("Navigating to home - device inventory page! From Return Page");
    this.router.navigate(['']);
  }

  resetForm(){
    console.log("Navigating to home - No action from Return Page");
    this.router.navigate(['']);
  }
}
