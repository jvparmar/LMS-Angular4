import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DepartmentRoutingModule, routedComponents } from './department.routing.module';
import { DepartmentService } from '../../@core/data/department.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { ButtonViewComponent } from './department-list/department-list.component';
// import { DepartmentListComponent } from './department-list/department-list.component';
// import { DepartmentFormComponent } from './department-form/department-form.component';
// import { DepartmentComponent } from './department.component';
//import { SmartTableService } from '../../@core/data/smart-table.service';

@NgModule({
  imports: [
    ThemeModule,
    //TablesRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    Ng2SmartTableModule,    
  ],
  declarations: [
    // DepartmentComponent,
    // DepartmentListComponent,
    // DepartmentFormComponent,
    ...routedComponents,
  ],
  providers: [
    //SmartTableService,    
    DepartmentService,
  ],
})
export class DepartmentModule { }
