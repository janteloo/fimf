"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ReportComponent = (function () {
    function ReportComponent(location) {
        this.location = location;
    }
    ReportComponent.prototype.onNavBtnTap = function () {
        this.location.back();
    };
    ReportComponent = __decorate([
        core_1.Component({
            selector: "report",
            templateUrl: "pages/report/report.html",
            styleUrls: ["pages/report/report-common.css"]
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map