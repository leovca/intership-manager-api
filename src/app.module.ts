import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrantorEntity } from './grantor/entity/grantor.entity';
import { GrantorModule } from './grantor/grantor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      //entities: [__dirname + '/../**/*.entity.{ts,js}'],
      entities: [GrantorEntity],
      synchronize: true,
    }),
    GrantorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
