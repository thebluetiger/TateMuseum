import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCommentDto } from 'src/api/dto/new-comment.dto';
import { Repository } from 'typeorm';
import { Art } from '../art/art.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  anonymousCommentExists(art: Art, name: string) {
    return this.commentRepository.findOneBy({
      art: {
        id: art.id,
      },
      name,
    });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: {
        id,
      },
    });
  }

  insertComment(art: Art, user: User, commentDto: NewCommentDto) {
    return this.commentRepository.insert({
      art,
      content: commentDto.content,
      user: user,
      name: user ? null : commentDto.name,
    });
  }

  clearAll() {
    return this.commentRepository.delete({});
  }
}
