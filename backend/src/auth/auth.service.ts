import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
     constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(user) {
      console.log('service', user)

      if(user.name == '' || user.email == '' || user.password == '' || user.confirmPassword == ''){
        throw new BadRequestException('All fields are required');

      }

    const existingUser = await this.userService.findUser(user.email);
    if (existingUser) throw new BadRequestException('User already exist');

    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userService.createUser({
        name:user.name,
      email: user.email,
      password: hashPassword,
    });

    return {user:{name:user.name, email:user.email}, message: 'User registered successfully' };

  }

  /// LOGIN ///

  async login(user, res:any) {
    console.log('login service', user)
    if(user.email == '' || user.password == ''){
        throw new BadRequestException('Invalid Credentials');
      }

    const loginUser = await this.userService.findUser(user.email);
    if (!loginUser) throw new UnauthorizedException('Invalid Credentials');
    const isMatched = await bcrypt.compare(user.password, loginUser.password);

    if (!isMatched) throw new UnauthorizedException('Invalid Credentials');

    const payload = {
      userId: loginUser._id,
      email: loginUser.email,
      role: loginUser.role,
      name:loginUser.name
    };

    await this.setCookies(payload, res)

    return { message: 'User loggedin successfully',user: {
    email: loginUser.email,
    role: loginUser.role,
    userId:loginUser._id,
    name: loginUser.name,
  }, };
  }

  /// SET COOKIES ///
  setCookies(payload, res:any){
     const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES'),
    });

    const isProd = this.config.getOrThrow('NODE_ENV') === 'production';

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      // sameSite: 'strict',
      sameSite: 'lax',
      secure: isProd,
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      // sameSite: 'strict',
      sameSite: 'lax',
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  //// REFRESH /////
  async refresh(req: any, res: any) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    let payload: any;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch {
       res.clearCookie('access_token', { path: '/' });
  res.clearCookie('refresh_token', { path: '/' });
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Create new access token
    const newAccessToken = this.jwtService.sign({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      name:payload.name
    });

    const isProd = this.config.getOrThrow('NODE_ENV') === 'production';

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    return { message: 'Access token refreshed' };
  }

  logout(res: any) {
    const isProd = this.config.getOrThrow('NODE_ENV') === 'production';

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      // sameSite: 'strict',
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      // sameSite: 'strict',
      path: '/',
    });

    return { message: 'Logged out successfully' };
  }

  ////  VALIDATE USER ////

   async validateUser(googleUser: any, res:any) {
    console.log('vali user', googleUser)
    let user = await this.userModel.findOne({ googleId: googleUser.googleId });

    console.log('vali user', user)

    if (!user) {
      user = await this.userModel.create(googleUser);
    }
    console.log('vali user 2', user)

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      name:user.name
    };

    await this.setCookies(payload, res)

    // return this.jwtService.sign({ sub: user._id });

     return { message: 'User loggedin successfully with google',user: {
    email: user.email,
    role: user.role,
    userId:user._id,
    name:user.name
  }, };
  }
}
