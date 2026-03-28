import { OrderService } from "./order.service";
import { CreateOrderDto } from "./create-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(dto: CreateOrderDto): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & Document & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        url?: undefined;
        orderId?: undefined;
    } | {
        url: string | null;
        orderId: import("mongoose").Types.ObjectId;
        message?: undefined;
        order?: undefined;
    } | undefined>;
    markPaid(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
