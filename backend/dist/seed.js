"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const products_shema_1 = require("./products/products.shema");
const menuSeed_1 = __importDefault(require("../src/seed/menuSeed"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const productModel = app.get((0, mongoose_1.getModelToken)(products_shema_1.Product.name));
    console.log("Deleting products...");
    await productModel.deleteMany({});
    console.log("Inserting products...");
    await productModel.insertMany(menuSeed_1.default);
    console.log("✅ Seeding completed");
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map