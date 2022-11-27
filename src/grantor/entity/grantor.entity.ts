import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

@Entity()
export class GrantorEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column({ name: 'legal_name' })
  legalName?: string;

  @Column({ name: 'document_number' })
  documentNumber?: string;

  @Column({ name: 'grantor_type' })
  documentType?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;

  constructor(grantor?: Partial<GrantorEntity>) {
    this.id = grantor?.id;
    this.name = grantor?.name;
    this.legalName = grantor?.legalName;
    this.documentNumber = grantor?.documentNumber;
    this.documentType = grantor?.documentType;
    this.createdAt = grantor?.createdAt;
    this.updatedAt = grantor?.updatedAt;
    this.deletedAt = grantor?.deletedAt;
  }
}
