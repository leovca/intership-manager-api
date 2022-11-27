import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GrantorService } from './grantor.service';
import { CreateGrantorDto } from './dto/create-grantor.dto';
import { UpdateGrantorDto } from './dto/update-grantor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { GrantorEntity } from './entity/grantor.entity';

@ApiTags('grantor')
@Controller('api/v1/grantor')
export class GrantorController {
  constructor(private readonly grantorService: GrantorService) {}

  @Post()
  @ApiOperation({ summary: 'Create grantor' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 201, description: 'Created' })
  async create(
    @Body() createGrantorDto: CreateGrantorDto,
  ): Promise<GrantorEntity> {
    return await this.grantorService.create(createGrantorDto);
  }

  @Get()
  async findAll(): Promise<GrantorEntity[]> {
    return await this.grantorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grantorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGrantorDto: UpdateGrantorDto) {
    return this.grantorService.update(id, updateGrantorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grantorService.remove(id);
  }
}
