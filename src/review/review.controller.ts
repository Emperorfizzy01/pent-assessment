import { Body, Controller, Post, Headers, Get, Param, Put,UseInterceptors, UploadedFiles, Res, Query} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { FileInterceptor, AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { ReviewInterface } from './interface/review.interface';
import { Helper } from '../../helper/sharedhelper';


@Controller('')
export class ReviewController {
  constructor(private service: ReviewService) {}

  @Post('/upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),)
  upload(@UploadedFiles() files: Array<Express.Multer.File>, @Headers('token')token: string, ): Promise<any> {
    return this.service.uploadFile(token, files);
  }

  @Get(':filepath')
     seeUploadedFile(@Param('filepath') file, @Res() res) {
    return res.sendFile(file, { root: './uploads' });
   }

   @Post('/review')
   review(@Body() createDto: CreateReviewDto, @Headers('token')token: string): Promise<any> {
    return this.service.makeReview(createDto, token)
   }

   @Post('/review/:id')
   increaseCount(@Param('id') id: number): Promise<any> {
    return this.service.increaseCount(id)
   }

   @Get('/review/:email')
   count(@Param('email') email: string, @Query() options): Promise<any> {
    return this.service.getReview(email, options)
   }

}