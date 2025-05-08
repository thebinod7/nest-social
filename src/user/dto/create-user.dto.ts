import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'john_doe',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'John Doe',
  })
  name: string;
}
