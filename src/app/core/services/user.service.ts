import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUser = environment.BASEAPIURL + 'users';

  private currUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor (private httpClient: HttpClient) { }

  get currentUser(): User | null {
    return this.currUser.value;
  }

  setCurrentUser(user: User) {
    this.currUser.next(new User(user));
  }

  getCurrentUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpClient.get(this.apiUser, data))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  subCurrentUser(): Observable<User | null> {
    return this.currUser.pipe(debounceTime(100));
  }

  getUsers(filters: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpClient.get(this.apiUser, { params: filters }))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  creatUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpClient.post(this.apiUser, data))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updateUser(data: any, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpClient.put(this.apiUser, data, { params: { id } }))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  deleteUser(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.httpClient.delete(this.apiUser + '/' + id))
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}
