import { Cart, CartDocument } from './cart.schema';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/products/products.shema';
export declare class CartService {
    private cartModel;
    private productModel;
    constructor(cartModel: Model<CartDocument>, productModel: Model<ProductDocument>);
    addToCart(data: any): Promise<(import("mongoose").Document<unknown, {}, CartDocument, {}, import("mongoose").DefaultSchemaOptions> & Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
        cartItem: import("mongoose").Document<unknown, {}, CartDocument, {}, import("mongoose").DefaultSchemaOptions> & Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
    }>;
    getCartItem(user: any): Promise<(import("mongoose").Document<unknown, {}, CartDocument, {}, import("mongoose").DefaultSchemaOptions> & Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    clearCart(user: any): Promise<{
        message: string;
    }>;
}
