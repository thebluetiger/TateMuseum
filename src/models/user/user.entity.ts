import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column()
  location: string;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];
}
