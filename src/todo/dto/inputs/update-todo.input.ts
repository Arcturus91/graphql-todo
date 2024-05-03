import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => String, { description: 'what needs to be done', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { description: 'if completed or not', nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @Field(() => Int)
  @IsNumber()
  id: number;
}
