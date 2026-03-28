import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from './products/products.shema'
import menuSeed from '../src/seed/menuSeed'

async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule)

  const productModel = app.get<Model<Product>>(getModelToken(Product.name))

  console.log("Deleting products...")
  await productModel.deleteMany({})

  console.log("Inserting products...")
  await productModel.insertMany(menuSeed)

  console.log("✅ Seeding completed")

  await app.close()
}

bootstrap()