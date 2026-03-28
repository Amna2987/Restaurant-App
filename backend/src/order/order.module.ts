import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { Cart } from 'src/cart/cart.schema';
import { Product, ProductSchema } from 'src/products/products.shema';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports:[MongooseModule.forFeature([
      {name:Order.name, schema:OrderSchema},
      {name:Product.name, schema:ProductSchema},
    ])],
})
export class OrderModule {}
