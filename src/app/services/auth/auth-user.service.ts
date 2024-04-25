import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

 
  private apiUrl = 'http://localhost:3000/api/v1/customers/';

  private tokenKey = 'token';

  constructor(private http: HttpClient,private router : Router) {}


  public login(account : any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, JSON.stringify(account));
  }

  
  public register(account : any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, JSON.stringify(account));
  }

  public profile(token:any): Observable<any> {
    return this.http.post(`${this.apiUrl}profile`,JSON.stringify(token));
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getId(): string | null {
    return localStorage.getItem("id");
  }

  setToken(token:any): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.clear();
    this.router.navigate(['Login'])
  }
}
