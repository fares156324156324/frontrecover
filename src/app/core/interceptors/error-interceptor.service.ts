import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401].indexOf(err.status) !== -1) {
          // Unauthorized, we will redirect him to login page
        //  this.toastrService.warning('Login Session has expired');
         // this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        else if ([403].indexOf(err.status) !== -1) {
          // Forbidden, we will redirect him to login page
          // this.toastrService.danger('This Resource is forbidden');
          this.router.navigate(['/home'], {
            queryParams:{
              'Error-Status': err.status
            }
          });
        }
        else if (err.status === 404) {
          this.router.navigate(['/404', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }
        else if(err.status === 500){
          this.router.navigate(['/404', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }
        return throwError(()=>err);
      })
    )
  }
}
