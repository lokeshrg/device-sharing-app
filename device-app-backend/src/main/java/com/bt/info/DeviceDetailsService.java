package com.bt.info;

import com.aafanasev.fonoapi.DeviceEntity;
import com.aafanasev.fonoapi.rxjava.FonoApiFactory;
import com.aafanasev.fonoapi.rxjava.FonoApiService;
import com.bt.data.DeviceInfo;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8091"})
@RestController
public class DeviceDetailsService {

    // generated at https://fonoapi.freshpixl.com/token/generate
    private static final String TOKEN = "f4c3e7bfd261269be4acca16bb8224dd9ecdacaaba7481af";
    private static FonoApiService api = new FonoApiFactory().create();

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/d1", produces = "text/html")
    public String getSampleDeviceDetails() {
        StringBuilder devices = new StringBuilder();
        List<DeviceEntity> details = api.getDevice(TOKEN, "honor", "huawei", 3).blockingGet();
        return buildDeviceInfoJson(details.get(0), devices);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/details")
    public String getDeviceDetailsByRequestParams(@RequestParam(defaultValue = "galaxy") String name, @RequestParam
            String brand, @RequestParam String deviceName, @RequestParam int position) {
        StringBuilder devices = new StringBuilder();
        List<DeviceEntity> details = api.getDevice(TOKEN, deviceName, brand, position).blockingGet();
        return buildDeviceInfoJson(details.get(0), devices);
    }

    @CrossOrigin(origins = "http://localhost:8091")
    @RequestMapping("/detail/{name}/{brand}/{position}")
    public String getDeviceDetailsByPathVars(@PathVariable("name") String name, @PathVariable("brand") String brand,
                                             @PathVariable("position") int position) {

        String errVal = "";
        StringBuilder devices = new StringBuilder();
        List<DeviceEntity> details = null;
        try {
            details = api.getDevice(TOKEN, name, brand, position).blockingGet();
        } catch (IllegalStateException illegalStateEx) {
            errVal = "Invalid input, please check input values, these may not be available at fono API " +
                    "@https://fonoapi.freshpixl.com/";
            System.err.println(errVal);
        } catch (Exception ex) {
            System.err.println("Some error occurred, might be due to connection issues");
        }
        return (details != null && details.size() > 0) ? buildDeviceInfoJson(details.get(0), devices) : errVal;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/allDevices")
    public String getAllDevices() {
        StringBuilder devices = new StringBuilder();

        List<DeviceEntity> s9 = api.getDevice(TOKEN, "galaxy s9", "Samsung", 1).blockingGet();
        s9.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (s9.size() > 0) { buildDeviceInfo(s9.get(0), devices); }

        List<DeviceEntity> s8 = api.getDevice(TOKEN, "galaxy s8", "Samsung", 1).blockingGet();
        s8.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (s8.size() > 0) { buildDeviceInfo(s8.get(0), devices); }

        List<DeviceEntity> s7 = api.getDevice(TOKEN, "galaxy s7", "Samsung", 1).blockingGet();
        s7.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (s7.size() > 0) { buildDeviceInfo(s7.get(0), devices); }

        List<DeviceEntity> n3310 = api.getDevice(TOKEN, "3310", "nokia", 1).blockingGet();
        n3310.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (n3310.size() > 0) { buildDeviceInfo(n3310.get(0), devices); }

        //Motorola Nexus 6 does not exist
        /*List<DeviceEntity> lgn5 = api.getDevice(TOKEN, "Nexus","LG", 3).blockingGet();
        lgn5.forEach(device -> System.out.println("First device: " + device.getDeviceName()));*/

        List<DeviceEntity> moton6 = api.getDevice(TOKEN, "nexus", "LG", 2).blockingGet(); // nexus 5X
        moton6.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (moton6.size() > 0) { buildDeviceInfo(moton6.get(0), devices); }

        List<DeviceEntity> hw7x = api.getDevice(TOKEN, "Honor", "Huawei", 19).blockingGet(); // HONOR 8
        hw7x.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (hw7x.size() > 0) { buildDeviceInfo(hw7x.get(0), devices); }

        List<DeviceEntity> aix = api.getDevice(TOKEN, "iPhone X", "Apple", 1).blockingGet();
        aix.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (aix.size() > 0) { buildDeviceInfo(aix.get(0), devices); }

        List<DeviceEntity> ai8 = api.getDevice(TOKEN, "iPhone 8", "Apple", 1).blockingGet();
        ai8.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (ai8.size() > 0) { buildDeviceInfo(ai8.get(0), devices); }

        List<DeviceEntity> ai4s = api.getDevice(TOKEN, "iPhone 4", "Apple", 2).blockingGet();
        ai4s.forEach(device -> System.out.println("First device: " + device.getDeviceName()));
        if (ai4s.size() > 0) { buildDeviceInfo(ai4s.get(0), devices); }

        /*List<DeviceEntity> response = api.getLatest(TOKEN, "Samsung", 10).execute();
          response.body().forEach(device -> System.out.println("First device: " + device.getDeviceName()));*/

        return devices.toString();
    }

    private String buildDeviceInfo(DeviceEntity info, StringBuilder devices) {
        devices.append(info.getDeviceName() + "::: \n");
        devices.append("Device Technology : " + info.getTechnology() + "\n");
        devices.append("Device 2G bands : " + info.get_2g_bands() + "\n");
        devices.append("Device 3G bands : " + info.get_3g_bands() + "\n");
        devices.append("Device 4G bands : " + info.get_4g_bands() + "\n");
        devices.append("**********" + System.getProperty("line.separator"));
        return devices.toString();
    }

    private String buildDeviceInfoJson(DeviceEntity info, StringBuilder devices) {
        //GsonBuilder gsonBuilder = new GsonBuilder();
        Gson gson = new Gson();
        DeviceInfo deviceInfo = new DeviceInfo();
        deviceInfo.setDeviceName(info.getDeviceName());
        deviceInfo.setTechnology(info.getTechnology());
        deviceInfo.setBands2G(info.get_2g_bands());
        deviceInfo.setBands3G(info.get_3g_bands());
        deviceInfo.setBands4G(info.get_4g_bands());
        return gson.toJson(deviceInfo);
    }
}
