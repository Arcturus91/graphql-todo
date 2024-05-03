import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del espacio', done: false },
    { id: 3, description: 'Piedra del poder', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
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
    if (done) todoToUpdate.done = done;

    return todoToUpdate;
  }
}
