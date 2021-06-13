import { StickerStamp } from './../../sticker-stamps/entities/sticker-stamp.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @OneToMany(() => Routine, (routine) => routine.userId)
  @OneToMany(() => StickerStamp, (stickerStamp) => stickerStamp.userId)
  id: number;

  @Column()
  @Field()
  username: string;
}
