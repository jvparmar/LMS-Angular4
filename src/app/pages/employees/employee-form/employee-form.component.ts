import { Component } from '@angular/core';
import { Location } from '@angular/common';
//import { inject } from '@angular/core/testing';
//import { IEmployeeList } from '../IEmployee';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../@core/utils/validators/index';
//import { EmployeeService } from 'app/_services/index';


//import {Component} from '@angular/core';
//import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
//import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

//import { lookupListToken } from 'app/pages/providers';
///import { EmployeeService } from 'app/pages/employee/components/employee-list/employee.service';
//../../theme/sass/auth

@Component({
  selector: 'employeeForm',
  //template: `<router-outlet></router-outlet>` 
  templateUrl: './employee-form.component.html',
  //styleUrls: ['../../../register/register.scss']
})

export class EmployeeFormComponent {
    public form:FormGroup;
    public employeeCode:AbstractControl;
    public firstName:AbstractControl;
    public lastName:AbstractControl;
    public email:AbstractControl;
    public gender:AbstractControl;
    public dateOfBirth:AbstractControl;
    public department:AbstractControl;
    public password:AbstractControl;
    public repeatPassword:AbstractControl;
    public passwords:FormGroup;
  
    public submitted:boolean = false;
  
    constructor(fb:FormBuilder, private location: Location) {

      this.form = fb.group({
        'employeeCode': ['2011', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(6)])],
        'firstName': ['Jigs', Validators.compose([Validators.required, Validators.minLength(4)])],
        'lastName': ['Parmar', Validators.compose([Validators.required, Validators.minLength(4)])],
        'email': ['email', Validators.compose([Validators.required])],    //, EmailValidator.validate
        'gender': ['Male',Validators.compose([Validators.required])],
        'dateOfBirth': ['01-10-1979', Validators.compose([Validators.required])],
        'department': ['Information Technology', Validators.compose([Validators.required]) ],
        'passwords': fb.group({
          'password': ['123456', Validators.compose([Validators.required, Validators.minLength(4)])],
          'repeatPassword': ['123456', Validators.compose([Validators.required, Validators.minLength(4)])]
        }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
      });
      this.employeeCode = this.form.controls['employeeCode'];
      this.firstName = this.form.controls['firstName'];
      this.lastName = this.form.controls['lastName'];
      this.email = this.form.controls['email'];
      this.gender = this.form.controls['gender'];
      this.dateOfBirth = this.form.controls['dateOfBirth'];
      this.department = this.form.controls['department'];
      this.passwords = <FormGroup> this.form.controls['passwords'];
      this.password = this.passwords.controls['password'];
      this.repeatPassword = this.passwords.controls['repeatPassword'];
    }
  
    public onSubmit(values:Object):void {
      this.submitted = true;
      if (this.form.valid) {
        // your code goes here
        console.log(values);
      }
    }
    
    goBack() : void{
        this.location.back();
    }


// //el: IEmployeeList;

// form;
// //public employeeCode:AbstractControl;
// //public firstName:AbstractControl;
// // public password:AbstractControl;
// // public repeatPassword:AbstractControl;
// // public passwords:FormGroup;

// public submitted:boolean = false;
// // public code: AbstractControl;
// // public firstName: AbstractControl;


// // formErrors = {
// //     code:'',
// //     firstName:'',
// //     lastName:''
// // }
// // validationMessages = {
// //     code:{
// //         required: 'Code is required',
// //         minlength: 'Employee Code must be 3 characters',
// //         maxlength: 'Employee can\'t be longer than 6 characters'
// //     },
// //     firstName:{
// //         required: 'First Name is required'
// //     },
// //     lastName: {
// //         required: 'Last Name is required'
// //     }
// // }

// //constructor(private location: Location) {}
// constructor(private fb: FormBuilder, private location: Location) {
//     this.form = fb.group({
//         'employeeCode': ['ABCD', Validators.compose([Validators.required, Validators.minLength(4)])],
//         'firstName': ['asdfasdf', Validators.compose([Validators.required])]    //, EmailValidator.validate
//         // 'passwords': fb.group({
//         //   'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
//         //   'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
//         // }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
//       });
  
//       //this.employeeCode = this.form.controls['employeeCode'];
//       //this.firstName = this.form.controls['firstName'];
//     //   this.passwords = <FormGroup> this.form.controls['passwords'];
//     //   this.password = this.passwords.controls['password'];
//     //   this.repeatPassword = this.passwords.controls['repeatPassword'];

// //     this.code = this.form.contains['code'];
// //     this.firstName = this.form.controls['firstName'];
// }

// //   constructor(private service: EmployeeService,
// //     @Inject(lookupListToken) public lookupLists) {
// //   this.service.getData().then((data) => {
// //     this.data = data;
// //   });
// // }

//     // ngOnInit(){
//     //     this.buildForm();
//     // }

//     // buildForm() {
//     //     // this. form = this.fb.group({
//     //     //     code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
//     //     //     firstName: ['', Validators.required],
//     //     //     lastName: ['', Validators.required]
//     //     // })


//     //     // this.form = new FormGroup({
//     //     //     employeeCode: new FormControl('', Validators.required)
//     //     //     //firstName: new FormControl('', Validators.required)
//     //     //     // lastName: new FormControl('', Validators.required)
//     //     //     // //email: new FormControl('', Validators.required),
//     //     //     // //gender: new FormControl('', Validators.required)
//     //     // })
//     // }

//     // onSubmit(newEmployeeForm: FormGroup){
//     //     console.log(newEmployeeForm);
//     // }
//     public onSubmit(values:Object):void {
//         alert('Submit');
//         this.submitted = true;
//         // if (this.form.valid) {
//         //   // your code goes here
//            console.log(values);
//         // }
//       }

//     goBack() : void{
//         this.location.back();
//     }

}
