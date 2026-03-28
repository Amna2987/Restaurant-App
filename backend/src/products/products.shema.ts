import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  basePrice: number;

  @Prop()
  prepTime: number;

  @Prop({
    type: [
      {
        name: { type: String },
        price: { type: Number }
      }
    ],
    default: []
  })
  variations: {
    name: string;
    price: number;
  }[];

  @Prop({
    type: [
      {
        name: { type: String },
        price: { type: Number }
      }
    ],
    default: []
  })
  addons: {
    name: string;
    price: number;
  }[];

  @Prop({ default: true })
  isAvailable: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);