"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var observable_1 = require("data/observable");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var MenuComponent = (function (_super) {
    __extends(MenuComponent, _super);
    function MenuComponent(page, _changeDetectionRef) {
        _super.call(this);
        this.page = page;
        this._changeDetectionRef = _changeDetectionRef;
    }
    MenuComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    MenuComponent.prototype.ngOnInit = function () {
        this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
            + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
    };
    MenuComponent.prototype.openDrawer = function () {
        this.drawer.showOverNavigation = true;
        this.drawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent), 
        __metadata('design:type', angular_1.RadSideDrawerComponent)
    ], MenuComponent.prototype, "drawerComponent", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: "menu",
            templateUrl: "pages/menu/menu.html",
            styleUrls: ['pages/menu/menu-common.css']
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [page_1.Page, core_1.ChangeDetectorRef])
    ], MenuComponent);
    return MenuComponent;
}(observable_1.Observable));
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map