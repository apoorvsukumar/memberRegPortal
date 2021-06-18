import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('basicauth')) {
            request = request.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('basicauth')
                }
            })
        }
        return next.handle(request);
    }
}