declare const menuSeed: {
    name: string;
    category: string;
    description: string;
    image: string;
    basePrice: number;
    prepTime: number;
    variations: {
        name: string;
        price: number;
    }[];
    addons: {
        name: string;
        price: number;
    }[];
}[];
export default menuSeed;
