import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './entities/user.entity';
import { Errormessage } from 'src/Errormessage';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

function numberGenerator() {
  var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
  return digits
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userModel: Repository<User>,
      ) {} 
  
    async signUp(userDto: CreateUserDto): Promise<any> {
      try {
        const userExist = await this.userModel.findOneBy({
          email: userDto.email.toLowerCase()
        });
        if(!userExist) {
          const user = await this.userModel.create({
            email: userDto.email.toLowerCase(),
            password: userDto.password
          })
          const saltRounds = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(user.password, saltRounds)
                    user.password = hashPassword
                    const newUser = await this.userModel.save(user);
                    return {
                      responseCode: 201,
                      success: true,
                      message: 'Account successfully created',
                      user: newUser
                   }
        }
        throw new NotFoundException(Errormessage.UserExist)
      } catch (err) {
        throw err
      }
    }

    async login(userDto: CreateUserDto): Promise<any> {
      try {
          const userExist = await this.userModel.findOneBy({
              email: userDto.email
          })
          if(!userExist) throw new NotFoundException(Errormessage.IncorrectData);
          const match = await bcrypt.compare(userDto.password, userExist.password)
          if(!match) throw new NotFoundException(Errormessage.IncorrectData);
          // Create a token
          const payload = { id: userExist.id, email: userExist.email};
          const options = { expiresIn: '24h' };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options)
          return { 
              responseCode: 200,
              success: true, 
              accessToken: token 
          };
      } catch (err) {
          throw err
      }
  }

}