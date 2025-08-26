import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppActions } from '../../state/app.actions';

export interface User {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  //knowledge table
  usersData = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user', password: 'user', role: 'user' }
  ];
  
  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private router: Router, private store: Store) {
    // Check if user is already logged in from localStorage (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.loggedUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  logIn(username: string, password: string): boolean {
    const user = this.usersData.find(u => u.username === username && u.password === password);
    if (user) {
      const userInfo = { username: user.username, role: user.role };
      this.loggedUserSubject.next(userInfo);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.store.dispatch(AppActions.clearUser());
  }

  getCurrentUser(): User | null {
    return this.loggedUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.loggedUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === 'admin';
  }

  isUser(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === 'user';
  }
}

