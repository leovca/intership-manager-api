import { BaseCustomEntity } from 'src/shared/Entities/base-custom.entity';
import { Column, Entity } from 'typeorm';

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

@Entity()
export class GrantorEntity extends BaseCustomEntity {
  @Column({ name: 'name' })
  name?: string;

  @Column({ name: 'legal_name' })
  legalName?: string;

  @Column({ name: 'document_number' })
  documentNumber?: string;

  @Column({ name: 'grantor_type' })
  documentType?: string;

  @Column({ name: 'address', nullable: true })
  address?: string;

  @Column({ name: 'address_number', nullable: true })
  addressNumber?: string;

  @Column({ name: 'address_complement', nullable: true })
  addressComplement?: string;

  @Column({ name: 'address_neighborhood', nullable: true })
  addressNeighborhood?: string;

  @Column({ name: 'address_city', nullable: true })
  addressCity?: string;

  @Column({ name: 'address_state', nullable: true })
  addressState?: string;

  @Column({ name: 'address_zip_code', nullable: true })
  addressZipCode?: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ name: 'cell_phone_number', nullable: true })
  cellPhoneNumber?: string;

  @Column({ name: 'email', nullable: true })
  email?: string;

  @Column({ name: 'site', nullable: true })
  site?: string;

  @Column({ name: 'contact_name', nullable: true })
  contactName?: string;

  @Column({ name: 'active', nullable: true })
  active?: boolean;

  @Column({ name: 'observation', nullable: true })
  observation?: string;

  constructor(grantor?: Partial<GrantorEntity>) {
    super();
    this.id = grantor?.id;
    this.name = grantor?.name;
    this.legalName = grantor?.legalName;
    this.documentNumber = grantor?.documentNumber;
    this.documentType = grantor?.documentType;
    this.address = grantor?.address;
    this.addressNumber = grantor?.addressNumber;
    this.addressComplement = grantor?.addressComplement;
    this.addressNeighborhood = grantor?.addressNeighborhood;
    this.addressCity = grantor?.addressCity;
    this.addressState = grantor?.addressState;
    this.addressZipCode = grantor?.addressZipCode;
    this.phoneNumber = grantor?.phoneNumber;
    this.cellPhoneNumber = grantor?.cellPhoneNumber;
    this.email = grantor?.email;
    this.site = grantor?.site;
    this.contactName = grantor?.contactName;
    this.active = grantor?.active;
    this.observation = grantor?.observation;

    this.createdAt = grantor?.createdAt;
    this.updatedAt = grantor?.updatedAt;
    this.deletedAt = grantor?.deletedAt;
  }
}
