import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToasterModule } from 'angular2-toaster';
import { LeavesRoutingModule, routedComponents } from './leaves.routing.module';
import { LeaveService } from '../../@core/data/index';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    ThemeModule,
    //TablesRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    //DepartmentRoutingModule,
    LeavesRoutingModule,
    Ng2SmartTableModule,    
    ToasterModule,
  ],
  declarations: [    
    ...routedComponents,
  ],
  providers: [
    //SmartTableService,    
    LeaveService,
    DatePipe
  ],
  schemas:[
    //CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LeavesModule { }
