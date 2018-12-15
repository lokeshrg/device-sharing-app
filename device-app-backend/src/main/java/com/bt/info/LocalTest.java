package com.bt.info;

import com.aafanasev.fonoapi.DeviceEntity;
import com.aafanasev.fonoapi.rxjava.FonoApiFactory;
import com.aafanasev.fonoapi.rxjava.FonoApiService;

import java.util.List;

public class LocalTest {

    // generated at https://fonoapi.freshpixl.com/token/generate
    private static final String TOKEN = "f4c3e7bfd261269be4acca16bb8224dd9ecdacaaba7481af";
    private static FonoApiService api = new FonoApiFactory().create();

    public static void main(String[] args) {
        //5 - iphone 4s, 18 max
        List<DeviceEntity> s9 = api.getDevice(TOKEN, "iphone", "Apple", 5).blockingGet();
        s9.forEach(device -> System.out.println("First device: " + device.getDeviceName()));


        for (int i = 1; i <= 99; i++) {
            List<DeviceEntity> s = api.getDevice(TOKEN, "honor", "huawei", i).blockingGet();
            s.forEach(device -> System.out.println(" : " + device.getDeviceName()));
        }
    }
}