import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'todo quick aggregation' })
export class AggregationsType {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pending: number;
  @Field(() => Int)
  completed: number;
}
