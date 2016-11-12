import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { Image } from "ui/image";
import { Label } from "ui/label";
import { Button } from "ui/button";
import { View } from "ui/core/view";


import LabelModule = require("ui/label");

var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var timer = require("timer");

var loginBtn;
var signUpBtn;
var logo;

@Component({
  selector: "my-app",
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit
{

  @ViewChild("backImage") backImage: ElementRef;
  @ViewChild("container") container: ElementRef;
  @ViewChild("header1") header1: ElementRef;
  @ViewChild("header2") header2: ElementRef;
  @ViewChild("header3") header3: ElementRef;
  @ViewChild("loginBtn") loginBtn: ElementRef;
  @ViewChild("signUpBtn") signUpBtn: ElementRef;
  @ViewChild("logo") logo: ElementRef;

  private loggedIn;

  constructor(private page: Page, private router: Router) {}

  ngOnInit() {
    this.page.actionBarHidden = true;
    if(this.loggedIn) {
        this.router.navigate(["/principal"]);
    }
    this.loggedIn = false; 
    this.startAnimation();
    this.setInitValues();

  }
  
  login() {
    this.loggedIn = true;
    this.router.navigate(["/principal"]);
  }

  startAnimation() {
    timer.setTimeout(() => {
      this.changeImage();
    }, 3000);
  }

  setInitValues() {
    loginBtn = <Button>this.loginBtn.nativeElement;
    signUpBtn = <Button>this.signUpBtn.nativeElement;
    logo = <Image>this.logo.nativeElement;

    loginBtn.opacity = 0;
    signUpBtn.opacity = 0;
    logo.opacity = 0;
    logo.scaleX = 10;
    logo.scaleY = 10;
  }

  changeImage() {
    var imageSource = require("image-source");
    let image = <Image>this.backImage.nativeElement;
    image.animate ( {
      opacity: 0,
      duration: 1000
    }).then(() =>  {
       this.changeText();
       image.imageSource = imageSource.fromResource("login_img2");
       image.animate( {
          opacity: 1,
          duration: 1000
       });
    }); 
  }

  changeText() {
    var label1 = <Label>this.header1.nativeElement;
    var label2 = <Label>this.header2.nativeElement;
    var label3 = <Label>this.header3.nativeElement;
    
    var stackContainer = <View> this.container.nativeElement;
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
    
    timer.setTimeout(() => {
      this.showButtons();
    }, 3000);
  } 

  showButtons() {
    loginBtn.animate( {
        opacity: 1,
        delay: 2000,
        duration: 1000
    });

    signUpBtn.animate( {
        opacity: 1,
        delay: 2000,
        duration: 1000
    });

    logo.animate( {
        opacity: 1,
        scale: { x: 1, y: 1 },
        duration: 2000
    });

  }   

 onLoginTap() {
   this.router.navigate(["/principal"]); 
  }

}


