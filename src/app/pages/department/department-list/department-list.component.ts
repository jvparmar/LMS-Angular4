import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Router, RouterStateSnapshot } from '@angular/router';
import { DepartmentService, AlertService } from '../../../@core/data/index';

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
  source: LocalDataSource = new LocalDataSource();
  data;
  

  constructor(private router: Router,
              private service: DepartmentService,
              private alterService: AlertService,                           
            ) {
              
  }

  settings = {
    actions:{
      add:false,
      edit: false,
      // edit: {
      //   mode: 'inline',    //'inline'|'external',
      // },
    },
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
      //deleteButtonContent: '<i class="nb-trash"></i>',
      deleteButtonContent: '<i class="nb-edit"></i>',
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
    },
  };

  

  async ngOnInit(){
    await this.service.getDepartmentList()
                .then(result => { this.data = result.json(); 
                                  //console.log(result.json());
                                  this.source.load(result.json()); 
                                })
                .catch(e => {
                    if(e.status == 401) {
                      this.alterService.showErrorAsync(e.json());
                      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/pages/departments/list' }});  
                    }
                    //this.alterService.showErrorAsync(e.json());
                    console.log(e)
                  });

  }


  
  

  onDeleteConfirm(event): void {
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    //   console.log(event.data.DepartmentId);
       this.router.navigate(['/pages/departments/edit/' + event.data.DepartmentId]);
    // } else {
    //   event.confirm.reject();
    // }
  }
}
