import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: parseInt(process.env.POSTGRE_PORT),
      username: process.env.POSTGRE_USER,
      password: process.env.POSTGRE_PASSWORD,
      database: process.env.POSTGRE_DB,
      entities: [City],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([City]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
