import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserDto } from 'src/api/dto/new-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  addUser(newUserDto: NewUserDto) {
    return this.userRepository.insert(newUserDto);
  }

  findAll() {
    return this.userRepository.find({});
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      select: {
        id: true,
      },
      where: {
        id,
      },
    });
  }

  clearAll() {
    return this.userRepository.delete({});
  }
}
