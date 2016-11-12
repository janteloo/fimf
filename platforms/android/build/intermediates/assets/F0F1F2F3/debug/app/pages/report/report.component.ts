import { Component } from '@angular/core';
import {Location} from '@angular/common';


@Component({
    selector: "report",
    templateUrl: "pages/report/report.html",
    styleUrls: ["pages/report/report-common.css"]
})

export class ReportComponent {

    constructor(private location: Location) {}

    onNavBtnTap() {
        this.location.back();
    }
} 