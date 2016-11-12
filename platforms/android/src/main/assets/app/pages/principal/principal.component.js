"use strict";
var core_1 = require('@angular/core');
var image_1 = require("ui/image");
var router_1 = require("@angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
var geolocation = require("nativescript-geolocation");
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
var mapsModule = require("nativescript-google-maps-sdk");
var imageSourceModule = require("image-source");
var timer = require("timer");
var PrincipalComponent = (function () {
    function PrincipalComponent(router) {
        var _this = this;
        this.router = router;
        this.isLoaded = false;
        //Map events
        this.onMapReady = function (event) {
            var mapView = event.object;
            console.log(event.gMap);
            var marker = new mapsModule.Marker();
            marker.position = mapsModule.Position.positionFromLatLng(-34.906569, -56.146226);
            marker.title = "Sydney";
            marker.snippet = "Australia";
            marker.userData = { index: 1 };
            var imageSource = require("image-source");
            var icon = new image_1.Image();
            icon.imageSource = imageSource.fromResource('cat_marker');
            marker.icon = icon;
            var marker2 = new mapsModule.Marker();
            marker2.position = mapsModule.Position.positionFromLatLng(-34.909042, -56.148070);
            marker2.title = "Marmu";
            marker2.snippet = "Se perdio el conchudo";
            marker2.userData = { index: 1 };
            icon = new image_1.Image();
            icon.imageSource = imageSource.fromResource('dog_marker');
            marker2.icon = icon;
            mapView.addMarker(marker);
            mapView.addMarker(marker2);
            console.log(_this.isLoaded);
        };
        //Map events
        this.onMarkerEvent = function (args) {
            console.log("Marker Event: '" + args.eventName
                + "' triggered on: " + args.marker.title
                + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
        };
    }
    PrincipalComponent.prototype.ngOnInit = function () {
        this.enableLocationTap();
    };
    PrincipalComponent.prototype.enableLocationTap = function () {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    };
    PrincipalComponent.prototype.buttonGetLocationTap = function () {
        console.log("executing get location...");
        var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
            then(function (loc) {
            if (loc) {
                console.log("Current location is: " + loc);
            }
        }, function (e) {
            console.log("Error: " + e.message);
        });
    };
    PrincipalComponent.prototype.onButtonTap = function () {
        var _this = this;
        this.isLoaded = true;
        var buttonImage = this.pawButonImage.nativeElement;
        buttonImage.imageSource = imageSourceModule.fromResource("paw_button_pressed");
        timer.setTimeout(function () {
            buttonImage.imageSource = imageSourceModule.fromResource("paw_button");
            _this.router.navigate(["/report"]);
        }, 100);
    };
    __decorate([
        core_1.ViewChild("MapView"), 
        __metadata('design:type', core_1.ElementRef)
    ], PrincipalComponent.prototype, "mapView", void 0);
    __decorate([
        core_1.ViewChild("pawButtonImage"), 
        __metadata('design:type', core_1.ElementRef)
    ], PrincipalComponent.prototype, "pawButonImage", void 0);
    PrincipalComponent = __decorate([
        core_1.Component({
            selector: "principal",
            templateUrl: "pages/principal/principal.html",
            styleUrls: ["pages/principal/principal-common.css", "pages/principal/principal.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], PrincipalComponent);
    return PrincipalComponent;
}());
exports.PrincipalComponent = PrincipalComponent;
//# sourceMappingURL=principal.component.js.map