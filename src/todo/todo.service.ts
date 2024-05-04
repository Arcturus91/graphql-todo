import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del espacio', done: false },
    { id: 3, description: 'Piedra del poder', done: false },
    { id: 4, description: 'Piedra del tiempo', done: true },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get pendingTodos() {
    return this.todos.filter((item) => item.done === false).length;
  }
  get completedTodos() {
    return this.todos.filter((item) => item.done === true).length;
  }

  findAll(statusArgs?: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status === undefined || status === null) return this.todos;

    const todosToReturn = this.todos.filter((item) => item.done === status);
    return todosToReturn;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) throw new NotFoundException(`todo with id ${id} not found`);
    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.done = false;
    todo.id = Math.max(...this.todos.map((item) => item.id), 0) + 1;
    if (!todo) throw new BadRequestException('todo was not able to be created');
    this.todos.push(todo);
    return todo;
  }

  updateTodo(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;

    const todoToUpdate = this.findOne(id);
    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;
    console.log('this todos', this.todos);
    return todoToUpdate;
  }

  deleteTodo(id: number): boolean {
    this.todos = this.todos.filter((item) => item.id !== id);
    return true;
  }
}
