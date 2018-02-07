import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
        path: '',
        component: AuthComponent,
        children: [{
                        path: '',
                        component: LoginComponent
                    },{
                        path: 'login',
                        component: LoginComponent
                    }, {
                        path: 'register',    
                        //component: 
                    }, {
                        path: '',
                        redirectTo: 'login',
                        //pathMatch: 'full',
                 }],
    }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

export const routedComponents = [  
    AuthComponent,
    LoginComponent,  
];
