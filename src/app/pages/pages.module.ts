import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NotificationService } from '../@core/data/index';
import { ToasterService } from 'angular2-toaster';
import { EmployeeLeavesComponent } from './employees/employee-leaves/employee-leaves.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    //EmployeeLeavesComponent,
  ],
  providers:[
    NotificationService,
    //ToasterService,
  ]
})
export class PagesModule {
}
