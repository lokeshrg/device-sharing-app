import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {DeviceDetailsService} from './device-details.service';

//import {index.js} from 'fonoapi-nodejs';
//import DevicesC
declare var require: any
//declare function require(name:string);
//let fonoapi = require('fonoapi-nodejs');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  router;
  deviceDetailsService;
  devices;
  constructor(router: Router, deviceDetailsService: DeviceDetailsService){
    this.router = router;
    this.deviceDetailsService = deviceDetailsService;
    //deviceDetailsService.loadData();

  }
  ngOnInit(){
    console.log('Retreive from local storage...');
    this.deviceDetailsService.loadData();
    //this.deviceDetailsService.devicesChanged
      //.subscribe( (devices ) => this.devices = devices);
    console.log(this.deviceDetailsService.getDeviceDetails());
    this.router.navigate([''])
  }
  
  getDetails(){
    // API call to fono api goes here
    alert( "Mock Data!");
  }
}
