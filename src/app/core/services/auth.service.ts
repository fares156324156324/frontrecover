import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiAuth = environment.BASEAPIURL;
  constructor (private http: HttpClient, private router: Router) { }

  login(data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.post(this.apiAuth + 'login', { ...data }, { observe: 'response' }))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  forgetPassword(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.post(this.apiAuth + 'auth/forget-password', data))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  resetPassword(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.post(this.apiAuth + 'auth/reset-password', data))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  checkToken(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.get(this.apiAuth + 'auth/check-token', { params: data })
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  prepareUserData() {
    return null;
  }


  getToken() {
    return null;
  }

  logout() {
    return null;
  }
}
