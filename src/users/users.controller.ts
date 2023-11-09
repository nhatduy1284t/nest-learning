import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { BaseResponse } from 'src/response/BaseResponse';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('postgre')
  async getUserPostgre() {
    const users = await this.userService.findAll();
    console.log(users);
    
    return users;

  }

  @Get()
  getUser() {
    return this.userService.fetchUsers();
  }
  

  @Get(':id')
  getUserById(@Param('id') id: String) {
    const user = this.userService.getUserById(id);
    if (user) {
      return user;
    } else {
      // Handle the case where the user is not found (return an appropriate response)
      return { message: 'User not found' };
    }
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  create(@Body() userData: CreateUserDto) {
    this.userService.createUser(userData);

    return userData;
  }

  @Post('login')
  async login(@Body() userData: CreateUserDto) {
    let result = this.userService.login(userData);
    if (result.isSuccess) {
      let response = new BaseResponse(200, 'Success', { 
        token: await this.userService.generateToken(userData),
      });

      return response;
    }
  }

  @Post('delete')
  deleteById(@Query('id') id: string) {
    const deletedUser = this.userService.deleteUserById(id);

    if (deletedUser) {
      return { message: 'User deleted successfully' };
    } else {
      return { message: 'User not found' };
    }
  }

  @Post('update')
  updateUserById(@Body() updateUser) {
    const updatedUser = this.userService.updateUserById(updateUser);

    if (updatedUser) {
      return { message: 'User updated successfully' };
    } else {
      return { message: 'User not found' };
    }
  }
}
