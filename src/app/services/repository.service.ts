import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { PINS } from './mocks/pins';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private mockMode = environment.mocks;

  constructor(private api: ApiService) {}

  public getPins() {
    if (this.mockMode) {
      return of(PINS);
    } else {
      return this.api.get('');
    }
  }

  public savePins(body) {
    if (this.mockMode) {
      return of(body);
    } else {
      return this.api.post('', body);
    }
  }

  public updatePin(id, body) {
    if (this.mockMode) {
      return of(body);
    } else {
      return this.api.put('/' + id, body);
    }
  }
}
