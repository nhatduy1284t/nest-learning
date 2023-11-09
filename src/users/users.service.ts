import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly secretKey = 'bortorthian';

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  users = [
    {
      id: 1,
      username: 'Anson',
      email: 'anson@@gmail.com',
      password: '1000',
    },
  ];
  async findAll(): Promise<User[]> {
    console.log(await this.userRepository.find())
    return this.userRepository.find();
  }

  fetchUsers() {
    return this.users;
  }

  createUser(user) {
    user.id = this.users.length + 1;
    this.users.push(user);

    console.log(this.users);
    return true;
  }

  getUserById(id) {
    return this.users.find((user) => user.id == id);
  }

  login(userData) {
    const user = this.users.find((u) => u.username === userData.username);

    if (!user) {
      return { isSuccess: true, message: 'User not found' };
    }

    const isPasswordValid = userData.password == user.password;

    if (isPasswordValid) {
      return {
        isSuccess: true,
        message: 'Login successful',
      };
    } else {
      return { isSuccess: true, message: 'Invalid password' };
    }
  }

  deleteUserById(id: string) {
    const index = this.users.findIndex((user) => String(user.id) === id);

    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1)[0];
      return deletedUser;
    }

    return null;
  }

  updateUserById(updateUser) {
    const index = this.users.findIndex((user) => user.id === updateUser.id);

    if (index !== -1) {
      // Update the user data with the provided data in updateUserDto
      this.users[index] = { ...this.users[index], ...updateUser };
      return this.users[index];
    }

    return null;
  }

  async generateToken(user: any) {
    const payload = { username: user.username };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }
}
