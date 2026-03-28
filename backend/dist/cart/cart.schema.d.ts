import { Document, Types } from "mongoose";
export type CartDocument = Cart & Document;
export declare class Cart {
    user: Types.ObjectId;
    product: Types.ObjectId;
    name: string;
    variation: string;
    addons: string[];
    quantity: number;
    price: number;
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, (Document<unknown, any, Cart, any, import("mongoose").DefaultSchemaOptions> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Cart, any, import("mongoose").DefaultSchemaOptions> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Cart>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, Cart, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    product?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    variation?: import("mongoose").SchemaDefinitionProperty<string, Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    addons?: import("mongoose").SchemaDefinitionProperty<string[], Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Cart, Document<unknown, {}, Cart, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Cart>;
