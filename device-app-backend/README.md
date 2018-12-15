# Endpoint app
## GET details for various mobile devices from fono api

This project was generated with gradle java plugin

## server/endpoint details

Run `gradle bootRun` for server to start. 
Navigate to `http://localhost:8091/d1` [Port number can be modified in application.properties]
to test the connection to fono api:
https://fonoapi.freshpixl.com/. 

Following are the endpoints exposed:
/allDevices : to list some 10 devices
/detail/{name}/{brand}/{position} : to get details about a device for a given brand and name, position is internally used to retrieve specific details from fono api as documentation on fono api is not clear about retrieving device info
[this has to based on trial and error to get the right device for a choice]
