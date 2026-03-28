import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService:CartService,
    ) {}

    /// ADD TO CART ///
    @Post('add-to-cart')
    @UseGuards(AuthGuard('jwt'))
    addToCart(@Body() body:any, @Req() req:any) {
        console.log('cart body', body)
        return this.cartService.addToCart({...body, userId: req.user.userId})
    }

    /// GET CART ITEM BY USER ///
    @Post('cart-items')
    @UseGuards(AuthGuard('jwt'))
    getCartItem(@Req() req:any) {
        return this.cartService.getCartItem({userId: req.user.userId})
    }
    /// CLEAR CART ///
    @Post('clear-cart')
    @UseGuards(AuthGuard('jwt'))
    clearCart(@Req() req:any) {
        return this.cartService.clearCart({userId: req.user.userId})
    }
}
