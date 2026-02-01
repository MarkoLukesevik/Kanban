import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api-service/api-service';

import Column from '../../models/column';
import CreateColumnRequest from '../../requests/column-requests/create-column-request';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private apiService: ApiService = inject(ApiService);

  public createColumn(request: CreateColumnRequest): Observable<Column> {
    return this.apiService.post<Column>('column', request);
  }
}
