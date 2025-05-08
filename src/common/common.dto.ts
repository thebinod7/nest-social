import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BasePaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: '',
  })
  search?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  page?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false, example: 20 })
  perPage?: number;
}
