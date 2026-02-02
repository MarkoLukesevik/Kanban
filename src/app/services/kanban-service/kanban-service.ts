import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api-service/api-service';

import Kanban from '../../models/kanban';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  public kanbanBoard: WritableSignal<Kanban | null> = signal<Kanban | null>(null);

  constructor(private apiService: ApiService) {}

  public getKanbanForUser(userId: string): Observable<Kanban> {
    return this.apiService.get<Kanban>(`kanban/?userId=${userId}`);
  }
}
