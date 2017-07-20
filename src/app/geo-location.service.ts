import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeoLocationService {

    // This is where your methods and properties go, for example: 
    constructor(private geolocation: Geolocation){}

    getGeoLocation() {
        return this.geolocation.getCurrentPosition();
    }
}