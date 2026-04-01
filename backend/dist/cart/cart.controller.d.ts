import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(body: any, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./cart.schema").CartDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.schema").Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
        cartItem: import("mongoose").Document<unknown, {}, import("./cart.schema").CartDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.schema").Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
    }>;
    getCartItem(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./cart.schema").CartDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./cart.schema").Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
}
