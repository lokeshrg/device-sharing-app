import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

//import { DatePipe } from '@angular/common';
import {DeviceDetailsService} from '../../app/device-details.service';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  devices:any[];
  //http;
  deviceDetailsService;
  //dateNow = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(deviceDetailsService: DeviceDetailsService, private http : HttpClient) {
    console.log("Loading device info from localStorage using service call!");
    this.deviceDetailsService = deviceDetailsService;
    this.devices = deviceDetailsService.getDeviceDetails();
    this.http = http;
  }

  ngOnInit() { 
    console.log("Device comp init!");

    this.deviceDetailsService.devicesChanged
      .subscribe( (devices ) => this.devices = devices);
    //this.devices = this.deviceDetailsService.getDeviceDetails();
   }

  getDetails(name, position){
    let nameArr = name.split(" ");
    class ddObj implements DeviceData {
      deviceName: string;
  technology: string;
  bands2G: string;
  bands3G: string;
  bands4G: string;
  }
  
    let devData = new ddObj();

    console.log("Device data before : ", devData);
    // use server URL here
    //sample: http://localhost:8091/detail/iphone/apple/5
    let url = "http://localhost:8091/detail/"
      + nameArr[1]
      + this.getSubModelName(nameArr)
      + "/"
      + nameArr[0]
      + "/"+position;
    console.log("Making http call to : ", url);

    this.http.get<DeviceData>(url, { observe: 'response' })
      .subscribe((resp) => {
        devData = { ...resp.body };
        console.log("resp: ins: ", resp.body);
        alert('Device details: '+JSON.stringify(resp.body));
      },
      error => {
        alert('Device details not found in fono api for : '+ name);
        console.error('Error in HTTP call');}
      ); //data: DeviceData
    /*let retVal = this.http.get(url).map(
      (res: any) => console.log("response: ",res))
    .catch(
      error => console.log(error));*/

    // call to fono api here

    console.log("Device data After: ", devData);
    /*for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      console.log(key, value);
    }*/

    //alert('Device details: '+devData);//+':\n'+retVal);
  }
  getSubModelName(name){
    //if(name.length < 3) {return '';}
    if(name[1] == 'Galaxy'){return '%20'+name[2];}
    return '';
  }
}



export interface DeviceData {
  deviceName: string;
  technology: string;
  bands2G: string;
  bands3G: string;
  bands4G: string;
}