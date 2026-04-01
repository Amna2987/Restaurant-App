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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const config_1 = require("@nestjs/config");
let OrderService = class OrderService {
    orderModel;
    configService;
    stripe;
    constructor(orderModel, configService) {
        this.orderModel = orderModel;
        this.configService = configService;
        const stripeKey = this.configService.get('STRIPE_SECRET_KEY');
        if (!stripeKey) {
            throw new Error('STRIPE_SECRET_KEY is missing');
        }
        this.stripe = new stripe_1.default(stripeKey);
    }
    async createOrder(dto) {
        const { items, paymentMethod, customerName, address, phone } = dto;
        if (!items || !paymentMethod || !customerName || !address || !phone) {
            throw new common_1.BadRequestException('All fields are required');
        }
        const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
        const orderId = 'ORD-' + Date.now();
        const order = await this.orderModel.create({
            orderId,
            items,
            customerName,
            address,
            phone,
            paymentMethod,
            totalAmount,
            paymentStatus: 'PENDING',
        });
        if (paymentMethod === 'COD') {
            return {
                message: 'Order placed successfully',
                order,
            };
        }
        if (paymentMethod === 'STRIPE') {
            const lineItems = items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${item.name} (${item.variation})`,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            }));
            const session = await this.stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: lineItems,
                success_url: `${this.configService.get('FRONTEND_URL')}/success`,
                cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel`,
            });
            order.stripeSessionId = session.id;
            await order.save();
            return {
                url: session.url,
                orderId: order._id,
                message: 'Pay order'
            };
        }
    }
    async markPaid(orderId) {
        return this.orderModel.findByIdAndUpdate(orderId, {
            paymentStatus: 'PAID',
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], OrderService);
//# sourceMappingURL=order.service.js.map