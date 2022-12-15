import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '../entity/grantor.entity';

export class CreateGrantorDto {
  constructor(partial: Partial<CreateGrantorDto>) {
    Object.assign(this, partial);
  }

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
  documentType?: DocumentType | string;

  @ApiProperty({ description: 'The address of grantor' })
  address?: string;

  @ApiProperty({ description: 'The address number of grantor' })
  addressNumber?: string;

  @ApiProperty({ description: 'The address complement of grantor' })
  addressComplement?: string;

  @ApiProperty({ description: 'The address neighborhood of grantor' })
  addressNeighborhood?: string;

  @ApiProperty({ description: 'The address city of grantor' })
  addressCity?: string;

  @ApiProperty({ description: 'The address state of grantor' })
  addressState?: string;

  @ApiProperty({ description: 'The address zip code of grantor' })
  addressZipCode?: string;

  @ApiProperty({ description: 'The phone number of grantor' })
  phoneNumber?: string;

  @ApiProperty({ description: 'The cell phone number of grantor' })
  cellPhoneNumber?: string;

  @ApiProperty({ description: 'The email of grantor' })
  email?: string;

  @ApiProperty({ description: 'The site of grantor' })
  site?: string;

  @ApiProperty({ description: 'The contact name of grantor' })
  contactName?: string;

  @ApiProperty({ description: 'The observation of grantor' })
  observation?: string;

  @ApiProperty({ description: 'The active status of grantor' })
  active?: boolean;
}
