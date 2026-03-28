import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument> ) {}

    createUser(user) {
        return this.userModel.create(user)
    }
    findUser(email) {
        return this.userModel.findOne({email:email})
    }
}





