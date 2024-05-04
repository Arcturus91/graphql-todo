import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    const createdTodo = this.todoService.createTodo(createTodoInput);
    return createdTodo;
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    const updatedTodo = this.todoService.updateTodo(updateTodoInput);
    return updatedTodo;
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    const result = this.todoService.deleteTodo(id);
    return result ? true : false;
  }

  @Query(() => Int)
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int)
  completedTodos(): number {
    return this.todoService.completedTodos;
  }
  @Query(() => Int)
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
    };
  }
}
