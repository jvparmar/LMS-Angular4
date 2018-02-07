import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DepartmentRoutingModule, routedComponents } from './department.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToasterModule } from 'angular2-toaster';
import { DepartmentService, AlertService } from '../../@core/data/index';


@NgModule({
  imports: [
    ThemeModule,    
    HttpModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    Ng2SmartTableModule,    
    ToasterModule,    
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [    
    DepartmentService,
    AlertService,    
  ]
})
export class DepartmentModule { }
