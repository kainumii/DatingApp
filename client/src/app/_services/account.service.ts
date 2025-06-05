import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/User';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'https://localhost:5001/api';
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post(`${this.baseUrl}/account/login`, model).pipe(
      map((response: any) => {
        const user = response as User;

        if(user) {
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));   
        }        
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  } 

  register(model: any) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map((user: User) => {
        if(user) {
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));   
        }
        return user; // Return the user so subscribers can access it
      })
    );
  }
}


