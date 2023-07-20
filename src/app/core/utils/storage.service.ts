import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  private storageBearerRefreshKey = 'refreshKey';
  private storageBearerAccessKey = 'accessKey';

  constructor() {}

  setAccessToken(token: string): void {
    sessionStorage.setItem(this.storageBearerAccessKey, token);
  }
  getAccessToken(): string | null {
    return sessionStorage.getItem(this.storageBearerAccessKey);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.storageBearerRefreshKey, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.storageBearerRefreshKey);
  }
}
