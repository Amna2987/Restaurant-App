import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';
import { Product, ProductSchema } from 'src/products/products.shema';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports:[MongooseModule.forFeature([
    {name:Cart.name, schema:CartSchema},
    {name:Product.name, schema:ProductSchema},
  ])],
  
})
export class CartModule {}
 