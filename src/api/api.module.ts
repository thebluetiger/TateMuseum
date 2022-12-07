import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ArtController } from './art/art.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from 'src/models/art/art.entity';
import { Comment } from 'src/models/comment/comment.entity';
import { ArtService } from 'src/models/art/art.service';
import { User } from 'src/models/user/user.entity';
import { CommentService } from 'src/models/comment/comment.service';
import { UserService } from 'src/models/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Art, Comment, User])],
  providers: [ArtService, CommentService, UserService],
  controllers: [UsersController, ArtController],
})
export class ApiModule {}
