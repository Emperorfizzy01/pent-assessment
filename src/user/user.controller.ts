import { Body, Controller, Post, Headers, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';


@Controller('')
export class UserController {
  constructor(private service: UserService) {}

  @Post('/signup')
  signUp(@Body() createDto: CreateUserDto): Promise<any> {
    return this.service.signUp(createDto);
  }

  @Post('/login')
  login(@Body() createDto: CreateUserDto): Promise<any> {
    return this.service.login(createDto);
  }
}