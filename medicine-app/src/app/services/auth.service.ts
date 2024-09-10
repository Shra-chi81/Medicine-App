// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dev-api.evitalrx.in/v1/patient/login'; 
  private currentRoute: string = '';

  constructor(private http: HttpClient, private router: Router) {
    // Track route changes
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  login(mobile: string, password: string, apikey: string): Observable<any> {
    return this.http.post(this.apiUrl, { mobile, password, apikey }).pipe(
      map((response: any) => {
        if (response.status_code === "1") {
          const userData = response.data;

          // Save the token and user details to localStorage
          localStorage.setItem('accessToken', userData.accesstoken);
          localStorage.setItem('patientId', userData.patient_id);
          localStorage.setItem('firstname', userData.firstname);
          localStorage.setItem('lastname', userData.lastname);
          localStorage.setItem('profilePicture', userData.profile_picture);
          localStorage.setItem('zipcode', userData.zipcode);

          return response;  
        } else if (response.status_code === "0") {
          alert(response.status_message); 
        } else {
          throw new Error(response.status_message); 
        }
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(null); 
      })
    );
  }

  // Check if the user is authenticated 
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Logout functionality 
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('patientId');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('profilePicture');
    localStorage.removeItem('zipcode');
  }

  // Determine if the user is on the login page
  isLoginPage(): boolean {
    return this.currentRoute === '/login'; 
  }
}
