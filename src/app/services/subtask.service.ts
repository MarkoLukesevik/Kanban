import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import Subtask from '../models/subtask';
import EditSubtaskRequest from '../requests/subtask-requests/edit-subtask-request';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  constructor(private apiService: ApiService) {}

  public editSubtask(request: EditSubtaskRequest): Observable<Subtask> {
    return this.apiService.put<Subtask>(`subtask`, request);
  }

  public deleteSubtask(subtaskId: string): Observable<void> {
    return this.apiService.delete<void>(`subtask?subtaskId=${subtaskId}`);
  }
}
