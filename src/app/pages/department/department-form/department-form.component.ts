import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../@core/data-model/index';
import { DepartmentService, NotificationService } from '../../../@core/data/index';
//import { ToasterService, ToasterConfig, ToasterContainerComponent, Toast, BodyOutputType } from 'angular2-toaster';
import { ToasterService } from 'angular2-toaster';  ///src/toaster.service
import { ToasterModule, ToasterConfig, BodyOutputType} from 'angular2-toaster';
import { Toast } from 'angular2-toaster';  ///src/toast


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
  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  });
  private toasterService: ToasterService;
  toast: Toast = {
    type: 'info',
    title: 'Here is a Toast Title',
    body: 'Here is a Toast Body'
  };
  
  constructor(private fb: FormBuilder, 
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private departmentService: DepartmentService,
              //private notificationService: NotificationService,
              toasterService : ToasterService) 
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
                                    .then(resolve => console.log(resolve))
                                    .catch(err => {this.toast.body = err;
                                                   this.toast.type = 'error'; 
                                                   //this.toasterService.pop(this.toast);  
                                                   this.toasterService.popAsync(this.toast);
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
  
  //********************************          NOTIFICATION    *********************************************************************************************************** */
  

  public config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  quotes = [
    { title: null, body: 'We rock at <i>Angular</i>' },
    { title: null, body: 'Titles are not always needed' },
    { title: null, body: 'Toastr rock!' },
    { title: 'What about nice html?', body: '<b>Sure you <em>can!</em></b>' },
  ];

  makeToast() {
    this.showToast(this.type, this.title, this.content);
  }

  openRandomToast () {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const type = this.types[typeIndex];
    const quote = this.quotes[quoteIndex];

    this.showToast(type, quote.title, quote.body);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
  }
}
