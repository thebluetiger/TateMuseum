import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Art } from '../art/art.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: false,
  })
  content: string;

  @ManyToOne((type) => Art, (art) => art.id)
  art: Art;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'userID' })
  user?: User;

  toJSON() {
    if (this.user) {
      return {
        id: this.id,
        userID: this.user.id,
        name: this.user.name,
        content: this.content,
      };
    } else {
      return {
        id: this.id,
        name: this.name,
        content: this.content,
      };
    }
  }
}
