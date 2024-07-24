import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user';
import { v4 } from 'uuid';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(name: string): Promise<User> {

    return this.userRepository.findOne({ where: { name } });
  }

  async createOne({ name, password }): Promise<User> {
    const id = v4(); 
    const newUser = this.userRepository.create({ id, name, password });

    try {
      await this.userRepository.save(newUser);    
    } catch (err) {
      console.error('Error creating user:', err);
      throw new Error('Failed to create user');
    }

    return newUser;

  }

}
