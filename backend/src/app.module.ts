import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, 
    UserModule,
     ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService) => ({
        uri:config.getOrThrow('MONGO_URI')
      })
    }),
    ProductsModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
