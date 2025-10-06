import { Component,OnInit } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTitle = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  addTodo() {
    if (!this.newTitle.trim()) return;
    this.todoService.addTodo({ title: this.newTitle, isCompleted: false })
      .subscribe(() => {
        this.newTitle = '';
        this.fetchTodos();
      });
  }

  toggleTodo(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id?: number) {
    this.todoService.deleteTodo(id!).subscribe(() => this.fetchTodos());
  }
}
