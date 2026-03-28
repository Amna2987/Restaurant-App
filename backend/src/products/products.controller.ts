import { Body, Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController { 

    constructor(
            private readonly productsService:ProductsService,
        ) {}


    //// ALL PRODUCTS /////
    @Get('all-items')
    getAll(){
        return this.productsService.getAllProducts()
    }

    //// ALL CATEGORIES ////
    @Get('all-categories')
    getAllCategories(){
        return this.productsService.getAllCatgries()
    }

}
