import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsBoolean()
  published: boolean;

  @IsNumber()
  authorId: number;
}
