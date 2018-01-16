import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Injectable()
export class NotificationService {
    constructor(private toasterService: ToasterService) {}

    config: ToasterConfig;

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

    // makeToast() {
    // this.showToast(this.type, this.title, this.content);
    // }
    makeToast(Type: string, Title: string, Content: string) {
        this.showToast(Type, Title, Content);
        //this.showToast(this.type, this.title, this.content);
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

    // private subject = new Subject<any>();
    // private keepAfterNavigationChange = false;
 
    // constructor(private router: Router) {
    //     // clear alert message on route change
    //     router.events.subscribe(event => {
    //         if (event instanceof NavigationStart) {
    //             if (this.keepAfterNavigationChange) {
    //                 // only keep for a single location change
    //                 this.keepAfterNavigationChange = false;
    //             } else {
    //                 // clear alert
    //                 this.subject.next();
    //             }
    //         }
    //     });
    // }
 
    // success(message: string, keepAfterNavigationChange = false) {
    //     this.keepAfterNavigationChange = keepAfterNavigationChange;
    //     this.subject.next({ type: 'success', text: message });
    // }
 
    // error(message: string, keepAfterNavigationChange = false) {
    //     this.keepAfterNavigationChange = keepAfterNavigationChange;
    //     this.subject.next({ type: 'error', text: message });
    // }
 
    // getMessage(): Observable<any> {
    //     return this.subject.asObservable();
    // }
}