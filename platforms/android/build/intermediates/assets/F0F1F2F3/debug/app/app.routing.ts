import { LoginComponent } from "./pages/login/login.component";
import { PrincipalComponent } from "./pages/principal/principal.component";
import { ReportComponent } from "./pages/report/report.component";

 
export const routes = [
  { path: "", component: LoginComponent }, 
  { path: "principal", component: PrincipalComponent },
  { path: "report", component: ReportComponent }
];

export const navigatableComponents = [
  LoginComponent,
  PrincipalComponent,
  ReportComponent
];