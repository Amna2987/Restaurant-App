import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({required: true })
  name: string;

  @Prop()
  variation: string;

  @Prop([String])
  addons: string[];

  @Prop()
  quantity: number;

  @Prop()
  price: number;

}

export const CartSchema = SchemaFactory.createForClass(Cart);