import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import {ExtractJwt,Strategy} from 'passport-jwt'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config:ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        console.log('COOKIES:', req.cookies);
        return req?.cookies?.access_token;
      },
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload:any) {
    return payload
  }
}