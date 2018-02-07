import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../@core/data-model/index';
import { DepartmentService, NotificationService, AlertService } from '../../../@core/data/index';
import { ToasterService, ToasterConfig, ToasterContainerComponent, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-department-form',
  styleUrls: ['./department-form.component.scss'],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent {
  form:FormGroup;
  public DepartmentId:AbstractControl;
  public DepartmentCode:AbstractControl;
  public DepartmentName:AbstractControl;
  public IsActive:AbstractControl;  
  //public deptResult: Department;
  
  private sub: any;
  public formMode;
  private toasterService: ToasterService;
  toast: Toast = {
    type: 'info',
    title: '',
    body: 'Here is a Toast Body'
  };
  
  constructor(private fb: FormBuilder, 
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private departmentService: DepartmentService,
              private alterService: AlertService,
              toasterService : ToasterService,              
              ) 
  {   
    this.toasterService = toasterService;
    const pDepartmentId = this.route.snapshot.paramMap.get('id');
    //this.pDepartmentId = this.route.snapshot.paramMap.get('id');
    console.log('Constructor Department Id : ' + parseInt(pDepartmentId));
    
    if(isNaN(parseInt(pDepartmentId))){
      this.formMode = "NEW";
    }
    else{
      this.formMode = "EDIT";
    }

    
  }

  ngOnInit(){
    this.form = this.fb.group({
      'DepartmentId': [''],
      'DepartmentCode': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(4)])],
      'DepartmentName': ['',Validators.compose([Validators.required])],
      'IsActive':['']
    })

    this.DepartmentId = this.form.controls['DepartmentId'];
    this.DepartmentCode = this.form.controls['DepartmentCode'];
    this.DepartmentName = this.form.controls['DepartmentName'];
    this.IsActive = this.form.controls['IsActive'];

    if(this.formMode == "NEW") {
      console.log('New Department request');
      this.form.setValue({
        DepartmentId: 0,
        DepartmentCode: '',
        DepartmentName: '',
        IsActive: true
      })
    }
    else {
      this.sub = this.route.params
      .delay(1000)
      .map(params=>params['id'])
      .switchMap(id=>this.departmentService.getDepartment(parseInt(id)))
      .subscribe((response: Department ) => { 
                this.form.setValue({
                  DepartmentId: response.DepartmentId,
                  DepartmentCode: response.DepartmentCode,
                  DepartmentName: response.DepartmentName,
                  IsActive: response.IsActive
                })
      }, 
      err=> {
        console.log('Service called Error : ' + err)
      });
    }
    
    
    //this.toasterService.pop(toast);
    //this.toasterService.pop('success', 'Args Title', 'Args Body');
  }

  async onSubmit() {        
    console.log(this.form.value);
    if(this.formMode == "EDIT") {        
        // await this.departmentService.updateDepartment(<Department>this.form.value)
        //                       .subscribe(response=> console.log(response),
        //                                  err=> console.log('Error on Update:' + err));

        await this.departmentService.updateDepartmentAsync(<Department>this.form.value)
                                    .then(resolve => {
                                      this.toast.body = resolve.json();
                                      // this.toasterService.popAsync(this.toast);
                                      this.alterService.showMessageAsync(this.toast);
                                      console.log(resolve.json());
                                    })
                                    .catch(err => {
                                                  // this.toast.body = err;
                                                  // this.toast.type = 'error'; 
                                                  // this.toasterService.popAsync(this.toast);
                                                  this.alterService.showErrorAsync(err.json());
                                                  });
                                    // .catch(err => {this.notificationService.makeToast('error', 'Error', err) ; 
                                    //                  console.log('Error in Update: '+ err); });                                    
                                    //.catch(err => console.log('Error in Update: ' + err));
    
    }
    else {
        console.log(this.form.value);
        this.departmentService.createDepartment(<Department>this.form.value)
                              .subscribe(response=>console.log(response),
                                         err=>console.log('Error on Create: ' + err));
    }

    // setTimeout(() => {
    //   //this.toasterService.pop(this.toast);
    //   console.log('Wait for update action...');
    // }, 1000);

    this.router.navigate(['/pages/departments/list']);
    //this.location.back();
  }

  goBack() : void {
    //this.router.navigate(['/pages/departments/list']);
    this.location.back();
  }
  
}
