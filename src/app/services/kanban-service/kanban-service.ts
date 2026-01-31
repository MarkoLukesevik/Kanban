import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api-service/api-service';

import Kanban from '../../models/kanban';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private kanbanBoard = signal<Kanban | null>(null);

  constructor(private apiService: ApiService) {}

  public getKanban(): Signal<Kanban | null> {
    return this.kanbanBoard;
  }

  public setKanban(kanban: Kanban): void {
    this.kanbanBoard.set(kanban);
  }

  public getKanbanForUser(userId: string): Observable<Kanban> {
    return this.apiService.get<Kanban>(`kanban/?userId=${userId}`);
  }
}
