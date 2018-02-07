import { Injectable } from '@angular/core';
import { ToasterModule, ToasterService, Toast, ToasterConfig, BodyOutputType} from 'angular2-toaster';

@Injectable()
export class AlertService {
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
    
    t1oastError: Toast = {
        type: 'error',
        title: 'ERROR: ',
        body: 'Here is a Toast Body'
    };

    toastError: Toast = {
        type: 'error',
        title: '',
        body: '',
        timeout: this.timeout,
        showCloseButton: this.isCloseButton,
        //bodyOutputType: BodyOutputType.TrustedHtml,
    };



    constructor(private toasterService : ToasterService) {
        
        //   const toast: Toast = {
        //     type: type,
        //     title: title,
        //     body: body,
        //     timeout: this.timeout,
        //     showCloseButton: this.isCloseButton,
        //     bodyOutputType: BodyOutputType.TrustedHtml,
        //   };
    }


    showError(errorMessage, title?: string){
        this.config = new ToasterConfig({
            positionClass: this.position,
            timeout: this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: this.animationType,
            limit: this.toastsLimit,
          });

        this.toastError.body = errorMessage;
        this.toastError.title = title? 'ERROR: ' + title : 'ERROR:';
        this.toasterService.pop(this.toastError);
    }

    showErrorAsync(errorMessage, title?: string){
        this.config = new ToasterConfig({
            positionClass: this.position,
            timeout: this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: this.animationType,
            limit: this.toastsLimit,
          });

        this.toastError.body = errorMessage;
        this.toastError.title = title? 'ERROR: ' + title : 'ERROR:';
        this.toasterService.popAsync(this.toastError);
    }

    showMessageAsync(toast: Toast){
        this.config = new ToasterConfig({
            positionClass: this.position,
            timeout: this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: this.animationType,
            limit: this.toastsLimit,
          });

        // this.toastError.body = errorMessage;
        // this.toastError.title = title? 'ERROR: ' + title : 'ERROR:';
        this.toasterService.popAsync(toast);
    }

}