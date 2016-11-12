import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Image } from "ui/image";
import { Router } from "@angular/router";

import {registerElement} from "nativescript-angular/element-registry";
import geolocation = require("nativescript-geolocation");
import { GestureTypes, GestureEventData } from "ui/gestures";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
var mapsModule = require("nativescript-google-maps-sdk");
var imageSourceModule = require("image-source");
var timer = require("timer");



@Component({
    selector: "principal",
    templateUrl: "pages/principal/principal.html",
    styleUrls: ["pages/principal/principal-common.css", "pages/principal/principal.css"]
})

export class PrincipalComponent implements OnInit {

    @ViewChild("MapView") mapView: ElementRef;
    @ViewChild("pawButtonImage") pawButonImage: ElementRef;
    isLoaded = false;

    constructor(private router: Router) {}

    //Map events
    onMapReady = (event) => {
        var mapView = event.object;
        console.log(event.gMap);
    
        var marker = new mapsModule.Marker();        
        marker.position = mapsModule.Position.positionFromLatLng(-34.906569, -56.146226);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = { index : 1};
        var imageSource = require("image-source");
        var icon = new Image();
        icon.imageSource = imageSource.fromResource('cat_marker');
        marker.icon = icon;

        var marker2 = new mapsModule.Marker();        
        marker2.position = mapsModule.Position.positionFromLatLng(-34.909042, -56.148070);
        marker2.title = "Marmu";
        marker2.snippet = "Se perdio el conchudo";
        marker2.userData = { index : 1};
        icon = new Image();
        icon.imageSource = imageSource.fromResource('dog_marker');
        marker2.icon = icon;

        mapView.addMarker(marker);
        mapView.addMarker(marker2);

        console.log(this.isLoaded);
    };

        //Map events
    onMarkerEvent = (args) => {
        console.log("Marker Event: '" + args.eventName
                + "' triggered on: " + args.marker.title
                + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    };


    ngOnInit() {
        this.enableLocationTap();
    }

    public enableLocationTap() { 
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }

    public buttonGetLocationTap() {
        console.log("executing get location...");
        var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
        then(function(loc) {
            if (loc) {
                console.log("Current location is: " + loc);
            }
        }, function(e){
            console.log("Error: " + e.message);
        });
    }

    public onButtonTap() {
      this.isLoaded = true;
      let buttonImage = <Image>this.pawButonImage.nativeElement;
      buttonImage.imageSource = imageSourceModule.fromResource("paw_button_pressed");
      timer.setTimeout(() => {
        buttonImage.imageSource = imageSourceModule.fromResource("paw_button");
        this.router.navigate(["/report"]);
      }, 100);

    }

} 