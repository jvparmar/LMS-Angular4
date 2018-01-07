import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';

//import { TablesComponent } from './tables.component';
//import { SmartTableComponent } from './smart-table/smart-table.component';

const routes: Routes = [{
  path: '',
  component: DepartmentComponent,
  children: [{
    path: 'new',
    component: DepartmentFormComponent
    }, {
    path: 'list',
    //component: SmartTableComponent,
    component: DepartmentListComponent
  }],  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule { }

export const routedComponents = [
  //TablesComponent,
  //SmartTableComponent,
  DepartmentComponent,
  DepartmentListComponent,
  DepartmentFormComponent
];
