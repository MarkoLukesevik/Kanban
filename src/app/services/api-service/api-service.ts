import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl: string = 'http://localhost:5229/';
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseurl + url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseurl + url, body, {
      withCredentials: true,
    });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseurl + url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseurl + url);
  }
}
