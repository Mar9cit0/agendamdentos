import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = window.localStorage.getItem("_token")
    const headers = new HttpHeaders({
       'token':"_token"
    });


    if(token) {
      request = request.clone({
          headers
        });
    }

    return next.handle(request);
  }
}
