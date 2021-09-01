import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { isGetAllUsers } from '../interceptors/mock.interceptor';
import { ConfigStateService } from '../state-services/config-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private configStateService: ConfigStateService
  ) { }

  /*
    VERB - get, post, put, delete, patch, options
    URL - 'http://localhost:3000/users'
    HEADERS - { 'Authorization', 'Bearer eyASHASJKFHASJKFHAK' }
    BODY - { name: 'test' }
  */

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.configStateService.config.apiRoot}/users`, {
      // headers: { 'isGetAllUsers': 'true' },
      // observe: 'response'
      // params: new HttpParams()
      //   .set('id', 1)
      context: new HttpContext()
        .set(isGetAllUsers, true)
    });
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiRoot}/users/${id}`);
  }

  add(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiRoot}/users`, user);
  }

  update(user: User) {
    return this.httpClient.put<User>(`${environment.apiRoot}/users/${user?.id}`, user);
  }

  delete(id: number) {
    return this.httpClient.delete<User>(`${environment.apiRoot}/users/${id}`);
  }
}
