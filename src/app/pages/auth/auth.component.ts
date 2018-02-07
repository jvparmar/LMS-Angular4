import { Component } from '@angular/core';

@Component({
  selector: 'auth',
  template: `                        
            <nb-layout>              
              <nb-layout-column>                                
                <nb-card>
                  <nb-card-body>
                    <toaster-container  ></toaster-container>
                    <div class="flex-centered col-xl-4 col-lg-6 col-md-8 col-sm-12">
                      <router-outlet></router-outlet>
                    </div>
                  </nb-card-body>
                </nb-card>
              </nb-layout-column>
            </nb-layout>
  `,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {  
}
