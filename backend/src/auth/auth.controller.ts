import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
        private readonly config:ConfigService
    ) {}

    /// REGISTER ///
    @Post('register')
    register(@Body() dto:registerDto) {
        console.log('register', dto)
        return this.authService.register(dto)
    }

    /// LOGIN ///
    @Post('login')
    login(@Body() dto:loginDto,  @Res({ passthrough: true }) res: any) {
        console.log('login', dto)
        return this.authService.login(dto, res)
    }

    /// REFRESH ///
     @Post('refresh')
  refresh(@Req() req: any, @Res({ passthrough: true }) res: any) {
    return this.authService.refresh(req, res);
  }

  /// LOGOUT ///

  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    return this.authService.logout(res);
  }

  //// GOOGLE////

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
   async googleCallback(@Req() req, @Res() res: Response) {
    console.log('req user google', req.user)
    const token = await this.authService.validateUser(req.user, res);
    console.log('req user google 1', token)
    // res.cookie('access_token', token, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   secure: false,
    // });

    res.redirect(this.config.getOrThrow('FRONTEND_URL'));
  }


 //// USER ////
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: any) {
    console.log(req.user, 'requser');
    return req.user;
  }
}
