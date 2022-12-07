import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ValueTransformer,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Art {
  @PrimaryColumn()
  id: number;

  @Column()
  accession_number: string;

  @Column()
  artist: string;

  @Column()
  artistRole: string;

  @Column()
  artistId: number;

  @Column({
    type: 'text',
  })
  title: string;

  @Column()
  dateText: string;

  @Column()
  medium: string;

  @Column({
    type: 'text',
  })
  creditLine: string;

  @Column({
    nullable: true,
    transformer: {
      to: (x) => {
        try {
          const i = parseInt(x, 10);
          if (isNaN(i)) return null;
          return i;
        } catch (e) {
          return null;
        }
      },
      from: (x) => x,
    } as ValueTransformer,
  })
  year: number;

  @Column({
    nullable: true,
    transformer: {
      to: (x) => {
        try {
          const i = parseInt(x, 10);
          if (isNaN(i)) return null;
          return i;
        } catch (e) {
          return null;
        }
      },
      from: (x) => x,
    } as ValueTransformer,
  })
  acquisitionYear: number;

  @Column()
  dimensions: string;

  @Column()
  width: string;

  @Column()
  height: string;

  @Column()
  depth: string;

  @Column()
  units: string;

  @Column()
  inscription: string;

  @Column({
    type: 'text',
  })
  thumbnailCopyright: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  url: string;

  @OneToMany((type) => Comment, (comment) => comment.art)
  comments: Comment[];
}
