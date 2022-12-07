import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/models/user/user.entity';
import { UserService } from 'src/models/user/user.service';
import { NewUserDto } from '../dto/new-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  listUsers() {
    return this.userService.findAll();
  }

  @Post()
  async newUser(@Body() user: NewUserDto, @Res() response: Response) {
    const errors = [];
    if (user.name == null || user.name.trim().length == 0) {
      errors.push("User's name is not allowed to be empty.");
    }
    if (user.location == null || user.location.trim().length == 0) {
      errors.push("User's location is not allowed to be empty.");
    }
    if (user.age == null || user.age < 0) {
      errors.push("User's age is not allowed to be empty.");
    }
    if (errors.length > 0) {
      return response.status(422).send(errors.join('\n'));
    }

    const res = await this.userService.addUser(user);
    if (res.generatedMaps.length > 0) {
      return response.send({
        id: res.generatedMaps[0].id,
        name: user.name,
        age: user.age,
        location: user.location,
      });
    } else {
      return response.status(500).send('Failed to insert user.');
    }
  }
}
