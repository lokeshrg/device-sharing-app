import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import {Subject} from 'rxjs';

declare var Date;

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailsService {
  //public rootDeviceInfo: any[];
  devices:any[];
  devicesChanged = new Subject<any[]>();

  //users: string[] = [];
  //dateNow = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(public datepipe: DatePipe) { 
    //
  }

  /**
   * Update the master set of device details in local storage
   */
  public setDeviceDetails(deviceName, status, bookedBy, date) {
    var devicesArray = JSON.parse(localStorage.getItem("rootDeviceInfo"));
    for (let i = 0; i < devicesArray.length; i++){
      if(devicesArray[i].name.includes(deviceName)){
        devicesArray[i].status = status;
        devicesArray[i].date = date;
        devicesArray[i].user = bookedBy;
        console.log("Updated status for ", deviceName, " to: ", status);
      }
      this.devicesChanged.next(devicesArray);
    }
    localStorage.setItem('rootDeviceInfo', JSON.stringify(devicesArray));
  }

  public getDeviceDetails(){
    // returns array of device details
    return JSON.parse(localStorage.getItem("rootDeviceInfo"));
  }

  public loadData(){
    localStorage.clear();
    this.devices = [
      {id:0, name: 'Samsung Galaxy S9', status: 'yes', position: 1},
      {id:1, name: 'Samsung Galaxy S8', status: 'yes', position: 2},
      {id:2, name: 'Samsung Galaxy S7', status: 'yes', position: 2},
      {id:3, name: 'Motorola Nexus 6',  status: 'yes', position: 1},//, user: 'Arjun', date: this.dateNow},
      {id:4, name: 'LG Nexus 5X',       status: 'yes', position: 2},
      {id:5, name: 'Huawei Honor 7X',   status: 'yes', position: 32},
      {id:6, name: 'Apple iPhone X',    status: 'yes', position: 18},
      {id:7, name: 'Apple iPhone 8',    status: 'yes', position: 17},//user: 'Sita', date: this.dateNow, 
      {id:8, name: 'Apple iPhone 4s',   status: 'yes', position: 5},//user: 'Ram', date: this.dateNow, 
      {id:9, name: 'Nokia 3310',        status: 'yes', position: 1}];//user: 'Ram', date: this.dateNow, 

    localStorage.setItem('rootDeviceInfo', JSON.stringify(this.devices));
  }


  /* 
  this.devices = [
      {id:0, name: 'Samsung Galaxy S9', status: 'yes', position: 1},
      {id:1, name: 'Samsung Galaxy S8', status: 'yes', position: 1},
      {id:2, name: 'Samsung Galaxy S7', status: 'yes', position: 1},
      {id:3, name: 'Motorola Nexus 6', status: 'no', user: 'Arjun', date: this.dateNow, position: 1},
      {id:4, name: 'LG Nexus 5', status: 'yes', position: 2},
      {id:5, name: 'Huawei Honor 7X', status: 'yes', position: 19},
      {id:6, name: 'Apple iPhone X', status: 'yes', position: 18},
      {id:7, name: 'Apple iPhone 8', status: 'no', user: 'Sita', date: this.dateNow, position: 17},
      {id:8, name: 'Apple iPhone 4s', status: 'no', user: 'Ram', date: this.dateNow, position: 5},
      {id:11, name: 'Nokia 3310', status: 'no', user: 'Ram', date: this.dateNow, position: 1}];

    //set in local storage
    localStorage.setItem('rootDeviceInfo', JSON.stringify(this.devices));
  */


}
