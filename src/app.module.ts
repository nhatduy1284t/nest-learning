import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',  // Use the host where your Docker container is running
    port: 5432,         // The host port you mapped to your container's PostgreSQL port
    username: 'postgres',  // PostgreSQL superuser
    password: 'mysecretpassword', // The password you set when running the Docker container
    database: 'postgres', // Name of your PostgreSQL database
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Specify your entity classes
    // entities:[User],

    synchronize: true, // In development, you can set this to true to auto-create tables, but use migrations in production.
  }),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
// console.log("__dirname" + __dirname)

