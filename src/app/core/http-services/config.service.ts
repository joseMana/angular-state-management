import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigStateService } from '../state-services/config-state.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private httpClient: HttpClient,
    private configStateService: ConfigStateService
  ) { }

  loadConfig(): Observable<any> {
    return this.httpClient.get('../../../assets/config/configs.json')
      .pipe(
        tap(config => this.configStateService.config = config)
      )      
  }
}
