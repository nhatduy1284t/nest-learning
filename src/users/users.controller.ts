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
import { getEnvSecrets } from 'gae-env-secrets';
// import {getSecret} from "../secrets/secrets";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/my-project/secrets/${secretName}/versions/latest`,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  return payload;
}

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('postgre')
  async getUserPostgre() {
    const users = await this.userService.findAll();

    return users;
  }

  @Get('getsecret')
  async getSecretValue() {
    try {
      const secretValue = await getSecret('CONFIG_KEY');

      return secretValue;
    } catch (error) {
      console.error(`Failed to get secret: ${error}`);
    }
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
