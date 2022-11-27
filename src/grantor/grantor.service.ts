import { Injectable } from '@nestjs/common';
import { CreateGrantorDto } from './dto/create-grantor.dto';
import { UpdateGrantorDto } from './dto/update-grantor.dto';
import { GrantorEntity } from './entity/grantor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GrantorService {
  constructor(
    @InjectRepository(GrantorEntity)
    private readonly grantorRepository: Repository<GrantorEntity>,
  ) {}

  async create(createConcedenteDto: CreateGrantorDto) {
    const concedenteExists = await this.grantorRepository.findOne({
      where: { documentNumber: createConcedenteDto.documentNumber },
    });
    if (concedenteExists) {
      throw new Error('Concedente já cadastrado');
    }

    const grantor = new GrantorEntity({ ...createConcedenteDto });
    return await this.grantorRepository.save(grantor);
  }

  async findAll(): Promise<GrantorEntity[]> {
    return await this.grantorRepository.find();
  }

  async findOne(id: string) {
    const grantor = await this.grantorRepository.findOne({ where: { id } });
    if (!grantor) {
      throw new Error('Concedente não encontrado');
    }
    return grantor;
  }

  async update(id: string, updateConcedenteDto: UpdateGrantorDto) {
    let grantor = await this.grantorRepository.findOne({ where: { id } });

    if (!grantor) {
      throw new Error('Concedente não encontrado');
    }

    grantor = this.grantorRepository.merge(grantor, updateConcedenteDto);

    return await this.grantorRepository.save(grantor);
  }

  async remove(id: string) {
    let grantor = await this.grantorRepository.findOne({ where: { id } });

    if (!grantor) {
      throw new Error('Concedente não encontrado');
    }

    await this.grantorRepository.softDelete({ id });
  }
}
