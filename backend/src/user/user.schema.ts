import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserDocument = User & Document
@Schema({timestamps:true})

export class User {
    @Prop({required:true})
    name:string

    @Prop({unique:true, required:true})
    email:string

    @Prop()
    password?:string

    @Prop({required:true, enum:['admin', 'user'], default:'user'})
    role:string

    @Prop({ unique: true,sparse: true })
    googleId?: string;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User)