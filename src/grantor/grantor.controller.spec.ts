import { GrantorController } from './grantor.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { GrantorService } from './grantor.service';
import { DocumentType, GrantorEntity } from './entity/grantor.entity';
import { CreateGrantorDto } from './dto/create-grantor.dto';

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

const updatedGrantor = { ...grantorList[0], name: 'Grantor 1 - Updated' };

describe('GrantorController', () => {
  let grantorController: GrantorController;
  let grantorService: GrantorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrantorController],
      providers: [
        {
          provide: GrantorService,
          useValue: {
            create: jest.fn().mockResolvedValue(grantorList[0]),
            findAll: jest.fn().mockResolvedValue(grantorList),
            findOne: jest.fn().mockResolvedValue(grantorList[0]),
            update: jest.fn().mockResolvedValue(updatedGrantor),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    grantorController = module.get<GrantorController>(GrantorController);
    grantorService = module.get<GrantorService>(GrantorService);
  });

  it('should be defined', () => {
    expect(grantorController).toBeDefined();
    expect(grantorService).toBeDefined();
  });

  describe('index', () => {
    it('should return a grantor list successfully', async () => {
      //Act
      const result = await grantorController.findAll();
      //Assert
      expect(result).toEqual(grantorList);
    });

    it('should return a empty list', async () => {
      //Arrange
      jest.spyOn(grantorService, 'findAll').mockResolvedValue([]);
      //Act
      const result = await grantorController.findAll();
      //Assert
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a grantor successfully', async () => {
      //Act
      const result = await grantorController.findOne('1');
      //Assert
      expect(result).toEqual(grantorList[0]);
    });

    it('should throw an error', async () => {
      //Arrange
      jest
        .spyOn(grantorService, 'findOne')
        .mockRejectedValue(new Error('Erro'));
      //Act
      const result = grantorController.findOne('1');
      //Assert
      expect(result).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a grantor successfully', async () => {
      //Act
      const result = await grantorController.create({ ...grantorList[0] });
      //Assert
      expect(result).toEqual(grantorList[0]);
    });

    it('should throw an error', async () => {
      //Arrange
      jest.spyOn(grantorService, 'create').mockRejectedValue(new Error('Erro'));
      //Act
      const result = grantorController.create({ ...grantorList[0] });
      //Assert
      expect(result).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a grantor successfully', async () => {
      //Act
      const result = await grantorController.update('1', {
        ...updatedGrantor,
      });
      //Assert
      expect(result).toEqual(updatedGrantor);
    });

    it('should throw an error', async () => {
      //Arrange
      jest.spyOn(grantorService, 'update').mockRejectedValue(new Error('Erro'));
      //Act
      const result = grantorController.update('1', {
        ...updatedGrantor,
      });
      //Assert
      expect(result).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a grantor successfully', async () => {
      //Act
      const result = await grantorController.remove('1');
      //Assert
      expect(result).toEqual(undefined);
    });

    it('should throw an error', async () => {
      //Arrange
      jest.spyOn(grantorService, 'remove').mockRejectedValue(new Error('Erro'));
      //Act
      const result = grantorController.remove('1');
      //Assert
      expect(result).rejects.toThrowError();
    });
  });
});
