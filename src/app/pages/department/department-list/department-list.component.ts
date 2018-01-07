import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DepartmentService } from '../../../@core/data/department.service';
//import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class DepartmentListComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // DepartmentId: {
      //   title: 'ID',
      //   type: 'number',
      //   width: 5
      // },
      DepartmentCode: {
        title: 'Department Code',
        type: 'string',
      },
      DepartmentName: {
        title: 'Department Name',
        type: 'string',
      },
      Status: {
        title: 'Status',
        type: 'string',
      },
      EmployeeCount: {
        title: 'No of Employee',
        type: 'number',
      },
    // columns: {
    //   id: {
    //     title: 'ID',
    //     type: 'number',
    //   },
    //   firstName: {
    //     title: 'First Name',
    //     type: 'string',
    //   },
    //   lastName: {
    //     title: 'Last Name',
    //     type: 'string',
    //   },
    //   username: {
    //     title: 'Username',
    //     type: 'string',
    //   },
    //   email: {
    //     title: 'E-mail',
    //     type: 'string',
    //   },
    //   age: {
    //     title: 'Age',
    //     type: 'number',
    //   },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data;
  constructor(private service: DepartmentService ) {
    //console.log('Department List constructor' + this.source.count());
    //const data = this.service.getData();
    
    this.service.getDepartmentList()
                .then(result => { this.data = result.json(); 
                                  console.log(result.json());
                                  this.source.load(result.json()); 
                                })
                .catch(e => console.log(e));

    console.log('Result ' + this.data);
    //this.source.load(this.service.getData());
    //this.source.load(this.data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
