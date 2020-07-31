import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {StudService} from './stud.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req,next)  {
    let studService = this.injector.get(StudService);
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization :`Bearer ${studService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
