import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop()
  orderId: string;

  @Prop({ type: Array })
  items: any[];

  @Prop()
  customerName: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ enum: ['COD', 'STRIPE'] })
  paymentMethod: string;

  @Prop({ default: 'PENDING' })
  paymentStatus: string;

  @Prop()
  totalAmount: number;

  @Prop()
  stripeSessionId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);