"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("./cart.schema");
const mongoose_2 = require("mongoose");
const products_shema_1 = require("../products/products.shema");
let CartService = class CartService {
    cartModel;
    productModel;
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    async addToCart(data) {
        console.log('cart', data);
        const { name, userId, itemId, variation, addon, quantity } = data;
        if (!userId) {
            throw new Error('User not found. Please login to place order');
        }
        const product = await this.productModel.findById(itemId);
        if (!product) {
            throw new Error('Product not found');
        }
        let price = product.basePrice;
        const selectedVariation = product.variations.find((v) => v.name === variation);
        console.log('selected variation', selectedVariation);
        if (selectedVariation) {
            price += selectedVariation.price;
        }
        let addonsPrice = 0;
        if (addon?.length) {
            addon.forEach((addonName) => {
                const foundAddon = product.addons.find((a) => a.name === addonName);
                console.log('addon', foundAddon);
                if (foundAddon) {
                    addonsPrice += foundAddon.price;
                }
            });
        }
        const totalPrice = (price + addonsPrice) * quantity;
        console.log('calculated total', totalPrice);
        const existingItem = await this.cartModel.findOne({
            user: userId,
            product: itemId,
        });
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price += totalPrice;
            await existingItem.save();
            return existingItem;
        }
        else {
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
        console.log('get cart', user);
        const userCart = await this.cartModel.find({ user: user.userId });
        console.log('user cart', userCart);
        return userCart;
    }
    async clearCart(user) {
        const userId = user.userId;
        if (!userId) {
            throw new Error('User not found');
        }
        await this.cartModel.deleteMany({ user: userId });
        return { message: 'Cart cleared successfully' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_shema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map