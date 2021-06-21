import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    urlsToNotUse: Array<string>;

    constructor() {
        this.urlsToNotUse= [
            'saveRegistration'
          ];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.isValidRequestForInterceptor(request.url)) {
            if (sessionStorage.getItem('username') && sessionStorage.getItem('basicauth')) {
                request = request.clone({
                    setHeaders: {
                        Authorization: sessionStorage.getItem('basicauth')
                    }
                })
            }
            return next.handle(request);
        }
        return next.handle(request);
    }

    private isValidRequestForInterceptor(requestUrl: string): boolean {
        // let positionIndicator: string = 'api/';
        // let position = requestUrl.indexOf(positionIndicator);
        // if (position > 0) {
        //   let destination: string = requestUrl.substr(position + positionIndicator.length);
        //   for (let address of this.urlsToNotUse) {
            // if (new RegExp(address).test(destination)) {
            //   return false;
            // }
        //   }
        // }


        if (this.urlsToNotUse.indexOf(requestUrl) > -1) {
            return false;
        }
        return true;
        
      }
}