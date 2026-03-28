export declare class CreateOrderDto {
    items: {
        productId: string;
        name: string;
        variation: string;
        addons: string[];
        quantity: number;
        price: number;
    }[];
    customerName: string;
    address: string;
    phone: string;
    paymentMethod: 'COD' | 'STRIPE';
}
