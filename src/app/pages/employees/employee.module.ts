import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToasterModule } from 'angular2-toaster';
import { EmployeeService } from '../../@core/data/index';
import { DatePipe } from '@angular/common';
import { EmployeesRoutingModule, routedComponents } from './employee.routing.module';


@NgModule({
  imports: [
    ThemeModule,
    //TablesRoutingModule,
    HttpModule,
    ReactiveFormsModule,        
    EmployeesRoutingModule,
    Ng2SmartTableModule,    
    ToasterModule,
  ],
  declarations: [    
    ...routedComponents,
  ],
  providers: [    
    EmployeeService
    //DatePipe
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,    
  ]
})
export class EmployeesModule { }
