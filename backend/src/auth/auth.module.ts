import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
     JwtStrategy, GoogleStrategy
    ],
  imports:[UserModule,
    PassportModule,
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService) => ({
         secret: config.get('JWT_ACCESS_SECRET'),
         signOptions: {
          expiresIn: config.get('JWT_ACCESS_EXPIRES'),
        }
      })
    })
  ]
})
export class AuthModule {}
