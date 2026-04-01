import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './create-order.dto';
import { ConfigService } from '@nestjs/config';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
@Injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private configService: ConfigService,
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is missing');
    }

    this.stripe = new Stripe(stripeKey);
  }

  async createOrder(dto: CreateOrderDto) {
    const { items, paymentMethod, customerName, address, phone } = dto;

    if(!items || !paymentMethod || !customerName || !address || !phone){
            throw new BadRequestException('All fields are required');
          }

    // ✅ 1. CALCULATE TOTAL (FIXED)
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    // ✅ 2. CREATE ORDER ID
    const orderId = 'ORD-' + Date.now();

    // ✅ 3. SAVE ORDER
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

    // =========================
    // 🟢 COD FLOW
    // =========================
    if (paymentMethod === 'COD') {
      return {
        message: 'Order placed successfully',
        order,
      };
    }

    // =========================
    // 🔵 STRIPE FLOW
    // =========================
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

      // ✅ SAVE STRIPE SESSION
      order.stripeSessionId = session.id;
      await order.save();

      return {
        url: session.url, // 👈 redirect frontend
        orderId: order._id,
        message: 'Pay order'
      };
    }
  }

  // ✅ MARK PAID
  async markPaid(orderId: string) {
    return this.orderModel.findByIdAndUpdate(orderId, {
      paymentStatus: 'PAID',
    });
  }
}
