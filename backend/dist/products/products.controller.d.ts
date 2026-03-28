import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./products.shema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./products.shema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getAllCategories(): Promise<string[]>;
}
