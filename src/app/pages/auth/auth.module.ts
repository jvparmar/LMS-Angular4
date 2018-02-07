import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToasterModule } from 'angular2-toaster';
import { AuthenticationService } from '../../@core/data/authentication.service';
import { AlertService } from '../../@core/data/alert.service';


@NgModule({
  imports: [
    ThemeModule,    
    AuthRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    Ng2SmartTableModule,    
    ToasterModule,
  ],
  declarations: [    
    ...routedComponents,
  ],
  providers: [    
    AuthenticationService,
    AlertService,
  ],
  schemas:[
    //CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthModule { }
