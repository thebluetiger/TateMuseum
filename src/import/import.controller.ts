import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Art } from 'src/models/art/art.entity';
import { ArtService } from 'src/models/art/art.service';
import { CommentService } from 'src/models/comment/comment.service';
import { UserService } from 'src/models/user/user.service';
import { DataSource } from 'typeorm';
const csv = require('csv-parser');
const fs = require('fs');

@Controller('import')
export class ImportController {
  constructor(
    private configService: ConfigService,
    private artService: ArtService,
    private commentService: CommentService,
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  @Get()
  async loadData() {
    const hasArt = await this.artService.hasArt();
    if (hasArt) {
      return "Art is already loaded, please clear database to start fresh, or visit '/import/clear'.";
    }

    const path = this.configService.get('seed');
    const list = await this.parse(path);
    const paging = 500;
    for (var i = 0; i < list.length; i += paging) {
      console.log(`Inserting ${i} to ${i + paging}, from ${list.length}`);
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Art)
        .values(list.slice(i, i + paging))
        .execute();
    }
    return `${list.length} art pieces added.`;
  }

  private async parse(path: string): Promise<any[]> {
    return new Promise((resolve) => {
      const results = [];
      fs.createReadStream(path)
        .pipe(
          csv({
            separator: ';',
          }),
        )
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    });
  }

  @Get('/clear')
  async clear() {
    await this.commentService.clearAll();
    await this.userService.clearAll();
    await this.artService.clearAll();
    return 'All clear';
  }
}
