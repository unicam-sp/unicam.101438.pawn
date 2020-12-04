package com.todos;

import java.net.InetAddress;

import com.facebook.react.bridge.Promise;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Ping extends ReactContextBaseJavaModule {

    Ping(ReactApplicationContext context) {
        super(context);
    }
    
    @ReactMethod
    public void checkServerStatus(String serverIP, Promise promise) {
        try {
            InetAddress inet = InetAddress.getByName(serverIP);
            if( inet.isReachable(5000) ) {
                String results = serverIP + " is reachable";
                // results += InetAddress.getLocalHost();
                promise.resolve(results);
            }
            else {
                promise.reject(serverIP + " is not reachable");
            }
        }
        catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    // import { NativeModules } from 'react-native'
    // NativeModules.Ping in JavaScript
    @Override
    public String getName() {
      return "Ping";
    }
}