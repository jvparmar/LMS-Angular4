import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DepartmentService } from '../../../@core/data/department.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';  ///src/toaster.service
import { ToasterModule, ToasterConfig} from 'angular2-toaster';
import { Toast } from 'angular2-toaster';  ///src/toast
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
  source: LocalDataSource = new LocalDataSource();
  data;
  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  });
  private toasterService1: ToasterService;

  constructor(private service: DepartmentService,
              private router: Router,
              private toasterService : ToasterService              
            ) {
              //this.toasterService = toasterService;

              
    //console.log('Department List constructor' + this.source.count());
    //const data = this.service.getData();
    
    // this.service.getDepartmentList()
    //             .then(result => { this.data = result.json(); 
    //                               //console.log(result.json());
    //                               this.source.load(result.json()); 
    //                             })
    //             .catch(e => console.log(e));

    //this.source.load(this.service.getData());
    //this.source.load(this.data);
  }

  settings = {
    actions:{
      add:false,
      edit: {
        mode: 'inline',    //'inline'|'external',
      },
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
                .catch(e => console.log(e));

                var toast: Toast = {
                  type: 'info',
                  title: 'Here is a Toast Title',
                  body: 'Here is a Toast Body'
                };
                
                //this.toasterService.pop(toast);
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
