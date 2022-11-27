import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '../entity/grantor.entity';

export class CreateGrantorDto {
  id?: string;

  @ApiProperty({
    description: 'The fantasy or real name of grantor',
    required: true,
    example: 'Microzzoft',
  })
  name?: string;

  @ApiProperty({ description: 'The legal name of grantor' })
  legalName?: string;

  @ApiProperty()
  documentNumber?: string;

  @ApiProperty({ enum: ['CNPJ', 'CPF'] })
  documentType?: DocumentType;
}
