// order.controller.ts
import { Controller, Post, Body, Param, Patch } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./create-order.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place-order')
createOrder(@Body() dto: CreateOrderDto) {
  return this.orderService.createOrder(dto);
}

@Patch(':id/pay')
markPaid(@Param('id') id: string) {
  return this.orderService.markPaid(id);
}
}