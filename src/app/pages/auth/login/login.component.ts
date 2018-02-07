import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../@core/data/authentication.service';
import { LoginData } from '../../../@core/data-model/index';

//import { ToasterService } from 'angular2-toaster';  ///src/toaster.service
//import { ToasterModule, ToasterService, Toast, ToasterConfig, BodyOutputType} from 'angular2-toaster';
import { AlertService } from '../../../@core/data/alert.service';
//import { Toast } from 'angular2-toaster';  ///src/toast


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  loading = false;
  returnUrl: string;

  
 

  // toast: Toast = {
  //   type: 'info',
  //   title: 'ERROR: ',
  //   body: 'Here is a Toast Body'
  // };

  constructor(fb:FormBuilder,
              private authenticationService: AuthenticationService,              
              //private toasterService : ToasterService,
              private alterService : AlertService,
              private route: ActivatedRoute,
              private router: Router ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    //console.log('Login constructor...');
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    //console.log('Login init...');
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('Return URL: ' + this.returnUrl);
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      let loginData = <LoginData>values; 
      console.log(loginData);

      this.loading = true;
      
      //this.authenticationService.login(this.model.username, this.model.password)
      this.authenticationService.login(loginData.email, loginData.password)
          .subscribe(
              data => {
                console.log('Logged in...') ;
                this.router.navigate([this.returnUrl]);
              },
              error => {
                  //this.alertService.error(error);
                  if(error.status == 404){
                    //alert(error.json());
                    // this.toast.type = 'error';
                    // this.toast.title = 'Error: ' + error.status;
                    // this.toast.body = error.json();
                    //this.toasterService.popAsync(this.toast);
                    this.alterService.showError(error.json());
                  }
                  console.log(error);
                  this.loading = false;
              });
    }
  }
}
