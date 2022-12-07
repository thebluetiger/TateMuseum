import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  SerializeOptions,
} from '@nestjs/common';
import { Response } from 'express';
import { ArtService } from 'src/models/art/art.service';
import { CommentService } from 'src/models/comment/comment.service';
import { UserService } from 'src/models/user/user.service';
import { NewCommentDto } from '../dto/new-comment.dto';

@Controller('api/art')
export class ArtController {
  constructor(
    private artService: ArtService,
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  @Get()
  listArt() {
    return this.artService.findAll();
  }

  @Get(':id')
  artByID(@Param('id') id: number) {
    return this.artService.findOne(id);
  }

  @Post(':id/comments')
  async newComment(
    @Param('id') id: number,
    @Body() commentDto: NewCommentDto,
    @Res() response: Response,
  ) {
    const art = await this.artService.findOne(id);
    if (art == null) {
      return response.status(404).send(`Missing art record for ${id} record.`);
    }

    const user = commentDto.userID
      ? await this.userService.findOne(commentDto.userID)
      : null;

    if (commentDto.userID && user == null) {
      return response
        .status(404)
        .send(`Missing user record for ${commentDto.userID} record.`);
    }

    if (
      !commentDto.userID &&
      (await this.commentService.anonymousCommentExists(art, commentDto.name))
    ) {
      return response
        .status(409)
        .send(
          `Anonymous user record already exists for name ${commentDto.name} for art ${id} record.`,
        );
    }

    const added = await this.commentService.insertComment(
      art,
      user,
      commentDto,
    );

    if (added.generatedMaps.length > 0) {
      const comment = await this.commentService.findOne(
        added.generatedMaps[0].id,
      );
      return response.send({
        id: comment.id,
        content: comment.content,
        name: comment.user ? comment.user.name : comment.name,
        userID: comment.user ? comment.user.id : null,
      });
    } else {
      return response.status(500).send('Failed to insert comment.');
    }
  }
}
