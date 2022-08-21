import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Errormessage } from 'src/Errormessage';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewInterface } from './interface/review.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private readonly reviewModel: Repository<Review>,
        @InjectRepository(User) private readonly userModel: Repository<User>
      ) {} 
    
    // async makeReview(reviewDto: CreateReviewDto, token: string, file: any): Promise<any> {
    //    try{
    //        if(!token) throw new NotFoundException(Errormessage.InvalidToken)
    //        // @ts-ignore
    //        const { email } = jwt.verify(token, process.env.JWT_SECRET)
    //        const user = await this.userModel.findOneBy({
    //            email: email
    //        })
    //        if(!user) throw new NotFoundException(Errormessage.IncorrectData);
    //        console.log(file.filename)
    //         const review = await this.reviewModel.create({
    //             comment: reviewDto.comment,
    //             email: email,
    //             date: new Date(Date.now()),
    //             attachments: `localhost:3000/${file.filename}`
    //         })
    //         const reviewed = await this.reviewModel.save(review)
    //         return reviewed
           
    //    } catch(err) {
    //       throw err
    //    }
    // }

    async uploadFile(token: string, file: any): Promise<any> {
        try{
           if(!token) throw new NotFoundException(Errormessage.InvalidToken)
           // @ts-ignore
           const { email } = jwt.verify(token, process.env.JWT_SECRET)
           const user = await this.userModel.findOneBy({
                      email: email
                  })
           if(!user) throw new NotFoundException(Errormessage.IncorrectData);
           return {
             responsecode: 200,
             uri: `localhost:3000/${file.filename}`
           }
        } catch(err) {
            throw err
        }
    }
}