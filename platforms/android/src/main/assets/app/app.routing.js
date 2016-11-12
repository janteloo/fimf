"use strict";
var login_component_1 = require("./pages/login/login.component");
var principal_component_1 = require("./pages/principal/principal.component");
var report_component_1 = require("./pages/report/report.component");
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "principal", component: principal_component_1.PrincipalComponent },
    { path: "report", component: report_component_1.ReportComponent }
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    principal_component_1.PrincipalComponent,
    report_component_1.ReportComponent
];
//# sourceMappingURL=app.routing.js.map