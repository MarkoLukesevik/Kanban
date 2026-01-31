import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api-service/api-service';

import Task from '../../models/task';

import CreateTaskRequest from '../../requests/task-requests/create-task-request';
import EditTaskRequest from '../../requests/task-requests/edit-task-request';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiService: ApiService) {}

  public getTaskById(taskId: string): Observable<Task> {
    return this.apiService.get<Task>(`task?taskId=${taskId}`);
  }

  public createTask(request: CreateTaskRequest): Observable<Task> {
    return this.apiService.post<Task>('task', request);
  }

  public editTask(request: EditTaskRequest): Observable<Task> {
    return this.apiService.put<Task>('task', request);
  }

  public deleteTask(taskId: string): Observable<void> {
    return this.apiService.delete<void>(`task?taskId=${taskId}`);
  }
}
