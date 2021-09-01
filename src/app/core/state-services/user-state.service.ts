import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private _users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
  private _recentlyAdded$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { 
    let recentCount = localStorage.getItem('recentlyAdded');
    this._recentlyAdded$.next(Number(recentCount));
  }

  get users$(): Observable<User[]> {
    return this._users$.asObservable();
  }

  set users(users: User[]) {
    this._users$.next(users);    
  }

  get recentlyAdded$(): Observable<number> {
    return this._recentlyAdded$.asObservable();
  }

  incrementRecentlyAdded(): void {
    let recentCount = localStorage.getItem('recentlyAdded');
    let newCount = Number(recentCount) + 1;
    this._recentlyAdded$.next(newCount);
    localStorage.setItem('recentlyAdded', String(newCount));
    // sessionStorage.setItem('recentlyAdded', String(newCount));
  }
}
