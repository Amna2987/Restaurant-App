import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.shema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel:Model<ProductDocument> ) {}

    async getAllProducts() {
        return await this.productModel.find()
    }
   async getAllCatgries() {
        const allProducts = await this.productModel.find()
        const allCategories = [... new Set(allProducts.map(item => item.category))]
        return allCategories
    }
}
