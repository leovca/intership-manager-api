import { Test, TestingModule } from '@nestjs/testing';
import { GrantorService } from './grantor.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { DocumentType, GrantorEntity } from './entity/grantor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const grantorList: GrantorEntity[] = [
  new GrantorEntity({
    id: '1',
    name: 'Grantor 1',
    documentNumber: '123456789',
    documentType: DocumentType.CNPJ,
  }),
  new GrantorEntity({
    id: '2',
    name: 'Grantor 2',
    documentNumber: '987654321',
    documentType: DocumentType.CNPJ,
  }),
  new GrantorEntity({
    id: '3',
    name: 'Grantor 3',
    documentNumber: '987654327',
    documentType: DocumentType.CNPJ,
  }),
  new GrantorEntity({
    id: '4',
    name: 'Grantor 4',
    documentNumber: '987654329',
    documentType: DocumentType.CNPJ,
  }),
];

const grantorUpdated = { ...grantorList[0], name: 'Grantor 1 - Updated' };

describe('GrantorService', () => {
  let service: GrantorService;
  let grantorRepository: Repository<GrantorEntity>;

  const GRANTOR_REPOSITORY_TOKEN = getRepositoryToken(GrantorEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrantorService,
        {
          provide: GRANTOR_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockReturnValue(grantorList),
            findOne: jest.fn().mockReturnValue(grantorList[0]),
            save: jest.fn(),
            merge: jest.fn().mockReturnValue(grantorUpdated),
            softDelete: jest.fn().mockReturnValue(grantorList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<GrantorService>(GrantorService);
    grantorRepository = module.get<Repository<GrantorEntity>>(
      GRANTOR_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(grantorRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a empty list', async () => {
      const grantorList: any[] = [];
      jest.spyOn(grantorRepository, 'find').mockResolvedValue(grantorList);
      expect(await service.findAll()).toEqual(grantorList);
    });

    it('should return a list of grantors', async () => {
      jest.spyOn(grantorRepository, 'find').mockResolvedValue(grantorList);
      expect(await service.findAll()).toEqual(grantorList);
    });
  });

  describe('create', () => {
    it('should crate a new grantor successfully', async () => {
      const grantor = grantorList[0];
      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(grantorRepository, 'save').mockResolvedValue(grantor);

      expect(await service.create({ ...grantor })).toEqual(grantor);
    });

    it('should throw a erro when try create a duplicated grantor', () => {
      const grantor = grantorList[0];
      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(grantor);

      expect(service.create({ ...grantor })).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a grantor successfully', async () => {
      const grantor: GrantorEntity = grantorList[0];
      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(grantor);
      expect(await service.findOne(grantor.id || '')).toEqual(grantor);
    });

    it('should throw a erro when the grantor is not found', () => {
      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(null);
      expect(service.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should be update a grantor successfully', async () => {
      const grantor = grantorList[0];

      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(grantor);
      jest.spyOn(grantorRepository, 'save').mockResolvedValue(grantorUpdated);

      expect(await service.update(grantor.id || '', grantor)).toEqual(
        grantorUpdated,
      );
    });

    it('should throw erro when the grantor does not exists', () => {
      const grantor = grantorList[0];

      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(null);

      expect(service.update(grantor.id || '', grantor)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should throw a erro when trying remove a nonexistent grantor', () => {
      jest.spyOn(grantorRepository, 'findOne').mockResolvedValue(null);
      expect(service.remove('1')).rejects.toThrowError();
    });

    it('should remove a grantor successfully', async () => {
      const grantor = grantorList[0];

      expect(await service.remove(grantor.id || '')).toBeUndefined();
    });
  });
});
