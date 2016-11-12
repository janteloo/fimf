"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var timer = require("timer");
var loginBtn;
var signUpBtn;
var logo;
var LoginComponent = (function () {
    function LoginComponent(page, router) {
        this.page = page;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        if (this.loggedIn) {
            this.router.navigate(["/principal"]);
        }
        this.loggedIn = false;
        this.startAnimation();
        this.setInitValues();
    };
    LoginComponent.prototype.login = function () {
        this.loggedIn = true;
        this.router.navigate(["/principal"]);
    };
    LoginComponent.prototype.startAnimation = function () {
        var _this = this;
        timer.setTimeout(function () {
            _this.changeImage();
        }, 3000);
    };
    LoginComponent.prototype.setInitValues = function () {
        loginBtn = this.loginBtn.nativeElement;
        signUpBtn = this.signUpBtn.nativeElement;
        logo = this.logo.nativeElement;
        loginBtn.opacity = 0;
        signUpBtn.opacity = 0;
        logo.opacity = 0;
        logo.scaleX = 10;
        logo.scaleY = 10;
    };
    LoginComponent.prototype.changeImage = function () {
        var _this = this;
        var imageSource = require("image-source");
        var image = this.backImage.nativeElement;
        image.animate({
            opacity: 0,
            duration: 1000
        }).then(function () {
            _this.changeText();
            image.imageSource = imageSource.fromResource("login_img2");
            image.animate({
                opacity: 1,
                duration: 1000
            });
        });
    };
    LoginComponent.prototype.changeText = function () {
        var _this = this;
        var label1 = this.header1.nativeElement;
        var label2 = this.header2.nativeElement;
        var label3 = this.header3.nativeElement;
        var stackContainer = this.container.nativeElement;
        stackContainer.className = 'text-container2';
        label1.text = 'Adopt a';
        label2.text = 'new friend';
        label3.text = 'and more!';
        label1.opacity = 0;
        label2.opacity = 0;
        label3.opacity = 0;
        label1.className = 'big-header header1';
        label2.className = 'big-header header2';
        label3.className = 'big-header header3';
        timer.setTimeout(function () {
            _this.showButtons();
        }, 3000);
    };
    LoginComponent.prototype.showButtons = function () {
        loginBtn.animate({
            opacity: 1,
            delay: 2000,
            duration: 1000
        });
        signUpBtn.animate({
            opacity: 1,
            delay: 2000,
            duration: 1000
        });
        logo.animate({
            opacity: 1,
            scale: { x: 1, y: 1 },
            duration: 2000
        });
    };
    LoginComponent.prototype.onLoginTap = function () {
        this.router.navigate(["/principal"]);
    };
    __decorate([
        core_1.ViewChild("backImage"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "backImage", void 0);
    __decorate([
        core_1.ViewChild("container"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild("header1"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "header1", void 0);
    __decorate([
        core_1.ViewChild("header2"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "header2", void 0);
    __decorate([
        core_1.ViewChild("header3"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "header3", void 0);
    __decorate([
        core_1.ViewChild("loginBtn"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "loginBtn", void 0);
    __decorate([
        core_1.ViewChild("signUpBtn"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "signUpBtn", void 0);
    __decorate([
        core_1.ViewChild("logo"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "logo", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "pages/login/login.html",
            styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
        }), 
        __metadata('design:paramtypes', [page_1.Page, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map