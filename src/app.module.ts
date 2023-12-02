import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { PhotoModule } from './photo/photo.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Specify your entity classes
      // entities:[User],

      synchronize: true, // In development, you can set this to true to auto-create tables, but use migrations in production.
    }),
    UsersModule,
    PhotoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule  {

  
}
// console.log("__dirname" + __dirname)
