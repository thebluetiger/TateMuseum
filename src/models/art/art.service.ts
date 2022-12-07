import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Art } from './art.entity';

@Injectable()
export class ArtService {
  constructor(
    @InjectRepository(Art)
    private artRepository: Repository<Art>,
  ) {}

  findAll(): Promise<Art[]> {
    return this.artRepository.find({
      select: {
        id: true,
        title: true,
        artist: true,
        year: true,
        comments: true,
      },
      relations: {
        comments: true,
      },
    });
  }

  async findOne(id: number): Promise<Art> {
    return this.artRepository.findOne({
      select: {
        id: true,
        title: true,
        artist: true,
        year: true,
        comments: true,
      },
      where: {
        id,
      },
      relations: {
        comments: true,
      },
    });
  }

  async hasArt(): Promise<boolean> {
    return (await this.artRepository.count()) > 0;
  }

  clearAll() {
    return this.artRepository.delete({});
  }
}
