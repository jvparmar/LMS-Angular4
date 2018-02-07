import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NotificationService, AlertService, AuthenticationService } from '../@core/data/index';


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
  ],
  providers:[
    NotificationService,
    //ToasterService,
    AlertService,
    AuthenticationService,
  ]
})
export class PagesModule {
}
