import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderStateService {

  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  set isLoading(show: boolean) {
    this._isLoading$.next(show);    
  }
}
