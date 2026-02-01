import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api-service/api-service';
import CreateColumnRequest from '../../requests/column-requests/create-column-request';
import { Observable } from 'rxjs';

import Column from '../../models/column';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private apiService: ApiService = inject(ApiService);

  public createColumn(request: CreateColumnRequest): Observable<Column> {
    return this.apiService.post<Column>('column', request);
  }
}
