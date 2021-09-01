import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderStateService } from '../state-services/loader-state.service';
import { isGetAllUsers } from './mock.interceptor';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loaderStateService: LoaderStateService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(isGetAllUsers)) {
      this.loaderStateService.isLoading = true;

      return next.handle(request)
      .pipe(
        delay(2000),
        tap(() => this.loaderStateService.isLoading = false)
      );
    }

    return next.handle(request);
  }
}
