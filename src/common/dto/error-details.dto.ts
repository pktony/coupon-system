import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetailsDto {
  @ApiProperty({ example: 40001, description: 'The specific error code' })
  statusSubCode: number;

  @ApiProperty({ example: 'Validation error occurred', description: 'The error message' })
  message: string;

  @ApiProperty({ example: null, nullable: true, description: 'Additional details about the error' })
  details?: any;
}
