import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5019/api/todo';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
