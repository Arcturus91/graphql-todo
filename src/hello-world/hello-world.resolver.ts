import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'hola mundo es lo que retorna',
    name: 'helloResolver',
  })
  helloWorld(): string {
    return 'hola mundo';
  }

  @Query(() => Float, { name: 'RandomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: 'numero random dentro de un rango definido',
    name: 'randomFromZeroTo',
  })
  randomNumFromZeroTo(
    @Args('to', { type: () => Int, nullable: true }) to: number = 6,
  ): number {
    // Yes, Math.random() in JavaScript can return 0, but it will never return 1.
    return Math.floor(Math.random() * to);
  }
}
