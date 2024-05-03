import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'what needs to be done' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
