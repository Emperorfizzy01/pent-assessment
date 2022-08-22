import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Errormessage } from 'src/Errormessage';
import { CreateReviewDto } from './dto/review.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private readonly reviewModel: Repository<Review>,
        @InjectRepository(User) private readonly userModel: Repository<User>
      ) {} 
  

    async uploadFile(token: string, files: any): Promise<any> {
        try{
           if(!token) throw new NotFoundException(Errormessage.InvalidToken)
           // @ts-ignore
           const { email } = jwt.verify(token, process.env.JWT_SECRET)
           const user = await this.userModel.findOneBy({
                      email: email
                  })
           if(!user) throw new NotFoundException(Errormessage.IncorrectData);
          return files.map(({filename})=>{ 

            return {
              responseCode: 200,
              success: true,
              uri: `localhost:3000/${filename}`
            };
          });
        } catch(err) {
            throw err
        }
    }

    async makeReview(reviewDto: CreateReviewDto, token: string): Promise<any> {
      try{
          if(!token) throw new NotFoundException(Errormessage.InvalidToken)
          // @ts-ignore
          const { email } = jwt.verify(token, process.env.JWT_SECRET)
          const user = await this.userModel.findOneBy({
              email: email
          })
          if(!user) throw new NotFoundException(Errormessage.IncorrectData);
          if(reviewDto.attachments) {
            const review = await this.reviewModel.create({
               comment: reviewDto.comment,
               email: email,
               attachments: reviewDto.attachments,
               date: new Date(Date.now())
            })
            const reviewed = await this.reviewModel.save(review)
            return reviewed
          } else {
           const review = await this.reviewModel.create({
             comment: reviewDto.comment,
             email: email,
             date: new Date(Date.now())
           })
           const reviewed = await this.reviewModel.save(review)
           return {
            responseCode: 200,
            success: true,
            review: reviewed
          }
          }
          
      } catch(err) {
         throw err
      }
   }

   async increaseCount(id: number): Promise<any> {
    try {
      const review = await this.reviewModel.findOneBy({
        id: id
      })
      const count = parseInt(review.count) + 1
      review.count = count.toString()
      const updatedReview = await this.reviewModel.save(review)
      return {
        responseCode: 200,
        success: true,
        review: updatedReview
      }
    } catch (err) {
      throw err
    }
   }

   async getReview(email: string, options: { sort: 'count' | 'date', order: 'ASC' | 'DESC' }): Promise<any> {
    try {
      const { sort = 'count' , order = 'DESC' } = options
      const review = await this.reviewModel.createQueryBuilder("review")
                     .where("review.email = :email", {email: email})
                     .orderBy(sort, order)
                     .getMany()
       return {
         responseCode: 200,
         success: true,
         reviews: review
       }
    } catch (err) {
      throw err
    }
   }
}                                                                               