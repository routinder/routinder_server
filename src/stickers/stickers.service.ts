import { Sticker } from './entities/sticker.entity';
import { Routine } from '../routines/entities/routine.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateStickerInput } from './dto/create-sticker.input';
// import { UpdateStickerInput } from './dto/update-sticker.input';
import { Repository } from 'typeorm';

@Injectable()
export class StickersService {
  constructor(
    @InjectRepository(Sticker) private stickersRepository: Repository<Sticker>,
  ) {}

  // create(createStickerInput: CreateStickerInput) {
  //   return 'This action adds a new sticker';
  // }

  findAll() {
    return this.stickersRepository.find();
  }

  findOne(id: number) {
    return this.stickersRepository.findOne(id);
  }

  findByDate(id: number, after?: Date, before?: Date) {
    return this.stickersRepository
      .createQueryBuilder('sticker')
      .innerJoinAndMapOne(
        'sticker.routine',
        Routine,
        'routine',
        'sticker.id = routine.stickerId',
      )
      .where('routine.userId = :userId', { userId: id })
      .andWhere('routine.startDate >= :start', { start: after })
      .andWhere('routine.startDate < :end', { end: before })
      .getMany();
  }
  // update(id: number, updateStickerInput: UpdateStickerInput) {
  //   return `This action updates a #${id} sticker`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sticker`;
  // }
}
