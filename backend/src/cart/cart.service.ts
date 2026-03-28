import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './cart.schema';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/products/products.shema';
import { log } from 'console';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  /// Add To Cart ///
  async addToCart(data) {
    console.log('cart', data);

    const { name,userId, itemId, variation, addon, quantity } = data;



    // 1. product from db
    if (!userId) {
      throw new Error('User not found. Please login to place order');
    }


    // 1. product from db

    const product = await this.productModel.findById(itemId);
    // console.log('db item', product)

    if (!product) {
      throw new Error('Product not found');
    }

    // 2. Base price
    let price = product.basePrice;

    // 3. Add variation price
    const selectedVariation = product.variations.find(
      (v) => v.name === variation,
    );

    console.log('selected variation', selectedVariation)

    if (selectedVariation) {
      price += selectedVariation.price;
    }

    // 4. Add addons price
    let addonsPrice = 0;

    if (addon?.length) {
      addon.forEach((addonName) => {
        const foundAddon = product.addons.find((a) => a.name === addonName);
        console.log('addon', foundAddon)
        if (foundAddon) {
          addonsPrice += foundAddon.price;
        }
      });
    }

    // 5. Total price
    const totalPrice = (price + addonsPrice) * quantity;

    console.log('calculated total', totalPrice);


    // check if SAME item already exists
const existingItem = await this.cartModel.findOne({
  user: userId,
  product: itemId,
//   variation,
//   addons: addon,
});

if (existingItem) {
  existingItem.quantity += quantity;
  existingItem.price += totalPrice;

  await existingItem.save();
  return existingItem;
}

else{

    
    // otherwise create new
    const cartItem = await this.cartModel.create({
      user: userId,
      product: itemId,
      name,
      variation,
      addons: addon,
      quantity,
      price: totalPrice,
    });
    
    return cartItem;
}
   
  }

  async getCartItem(user) {
    console.log('get cart', user)
    const userCart = await this.cartModel.find({user:user.userId})
    console.log('user cart', userCart)
    return userCart
  }

  async clearCart(user) {
  const userId = user.userId;

  if (!userId) {
    throw new Error('User not found');
  }

  await this.cartModel.deleteMany({ user: userId });

  return { message: 'Cart cleared successfully' };
}
}
