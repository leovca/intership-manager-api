import { Module } from '@nestjs/common';
import { GrantorService } from './grantor.service';
import { GrantorController } from './grantor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantorEntity } from './entity/grantor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrantorEntity])],
  controllers: [GrantorController],
  providers: [GrantorService],
})
export class GrantorModule {}
