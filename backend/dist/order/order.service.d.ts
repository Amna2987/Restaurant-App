import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './create-order.dto';
import { ConfigService } from '@nestjs/config';
export declare class OrderService {
    private orderModel;
    private configService;
    private stripe;
    constructor(orderModel: Model<OrderDocument>, configService: ConfigService);
    createOrder(dto: CreateOrderDto): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & Document & {
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
        message: string;
        order?: undefined;
    } | undefined>;
    markPaid(orderId: string): Promise<(import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
