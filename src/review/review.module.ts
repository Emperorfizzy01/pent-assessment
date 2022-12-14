import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports: [
    MulterModule.register({
        dest: './uploads',
      }),
      TypeOrmModule.forFeature([Review, User]),
      ConfigModule.forRoot(),
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
  })
  export class ReviewModule {}