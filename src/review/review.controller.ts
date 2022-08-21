import { Body, Controller, Post, Headers, Get, Param, Put,  UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { ReviewInterface } from './interface/review.interface';
import { Helper } from '../../helper/sharedhelper';


@Controller('')
export class ReviewController {
  constructor(private service: ReviewService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file[]', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),)
  upload(@Headers('token')token: string, @UploadedFile() file): Promise<any> {
    return this.service.uploadFile(token, file);
  }

  @Get(':filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    return res.sendFile(file, { root: './uploads' });
  }

}