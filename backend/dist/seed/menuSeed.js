"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menuSeed = [
    {
        name: "Classic Beef Burger",
        category: "Burgers",
        description: "Juicy grilled beef patty served with fresh lettuce, tomato, pickles and our signature house sauce inside a toasted brioche bun.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        basePrice: 8.99,
        prepTime: 12,
        variations: [
            { name: "Single Patty", price: 0 },
            { name: "Double Patty", price: 3 },
            { name: "Triple Patty", price: 5 }
        ],
        addons: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Bacon", price: 2 },
            { name: "Caramelized Onions", price: 1 },
            { name: "Extra Sauce", price: 0.5 }
        ]
    },
    {
        name: "Spicy Chicken Burger",
        category: "Burgers",
        description: "Crispy fried chicken breast coated in spicy seasoning with lettuce, jalapenos and chipotle mayo.",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
        basePrice: 7.99,
        prepTime: 10,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Extra Spicy", price: 0.5 }
        ],
        addons: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Jalapenos", price: 1 },
            { name: "Bacon", price: 2 }
        ]
    },
    {
        name: "BBQ Bacon Burger",
        category: "Burgers",
        description: "Smoky BBQ beef burger topped with crispy bacon, cheddar cheese and onion rings.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        basePrice: 10.5,
        prepTime: 14,
        variations: [
            { name: "Single Patty", price: 0 },
            { name: "Double Patty", price: 3 }
        ],
        addons: [
            { name: "Extra Bacon", price: 2 },
            { name: "Extra Cheese", price: 1.5 }
        ]
    },
    {
        name: "Mushroom Swiss Burger",
        category: "Burgers",
        description: "Grilled beef burger topped with sautéed mushrooms and creamy Swiss cheese.",
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
        basePrice: 9.5,
        prepTime: 13,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Double Patty", price: 3 }
        ],
        addons: [
            { name: "Extra Mushrooms", price: 1.2 },
            { name: "Extra Swiss Cheese", price: 1.5 }
        ]
    },
    {
        name: "Veggie Burger",
        category: "Burgers",
        description: "Plant-based patty served with avocado, lettuce, tomato and vegan mayo.",
        image: "https://images.unsplash.com/photo-1585238342028-4bce3c2cdb34",
        basePrice: 7.5,
        prepTime: 9,
        variations: [
            { name: "Regular Bun", price: 0 },
            { name: "Gluten Free Bun", price: 1 }
        ],
        addons: [
            { name: "Avocado", price: 1.5 },
            { name: "Vegan Cheese", price: 1.5 }
        ]
    },
    {
        name: "Margherita Pizza",
        category: "Pizza",
        description: "Classic Italian pizza topped with tomato sauce, mozzarella cheese and fresh basil.",
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
        basePrice: 12,
        prepTime: 15,
        variations: [
            { name: "Small", price: 0 },
            { name: "Medium", price: 3 },
            { name: "Large", price: 5 }
        ],
        addons: [
            { name: "Extra Cheese", price: 2 },
            { name: "Olives", price: 1 },
            { name: "Mushrooms", price: 1.5 }
        ]
    },
    {
        name: "Pepperoni Pizza",
        category: "Pizza",
        description: "Traditional pepperoni pizza with mozzarella cheese and house pizza sauce.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        basePrice: 14,
        prepTime: 16,
        variations: [
            { name: "Small", price: 0 },
            { name: "Medium", price: 3 },
            { name: "Large", price: 5 }
        ],
        addons: [
            { name: "Extra Pepperoni", price: 2 },
            { name: "Extra Cheese", price: 2 }
        ]
    },
    {
        name: "BBQ Chicken Pizza",
        category: "Pizza",
        description: "Grilled chicken pizza topped with smoky BBQ sauce, onions and mozzarella.",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
        basePrice: 15,
        prepTime: 18,
        variations: [
            { name: "Medium", price: 0 },
            { name: "Large", price: 4 }
        ],
        addons: [
            { name: "Extra Chicken", price: 3 },
            { name: "Extra BBQ Sauce", price: 1 }
        ]
    },
    {
        name: "Veggie Supreme Pizza",
        category: "Pizza",
        description: "A mix of fresh vegetables including olives, bell peppers, onions and mushrooms.",
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
        basePrice: 13,
        prepTime: 17,
        variations: [
            { name: "Medium", price: 0 },
            { name: "Large", price: 4 }
        ],
        addons: [
            { name: "Extra Veggies", price: 2 },
            { name: "Extra Cheese", price: 2 }
        ]
    },
    {
        name: "Four Cheese Pizza",
        category: "Pizza",
        description: "A creamy blend of mozzarella, parmesan, cheddar and blue cheese.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        basePrice: 15,
        prepTime: 17,
        variations: [
            { name: "Medium", price: 0 },
            { name: "Large", price: 4 }
        ],
        addons: [
            { name: "Extra Cheese Mix", price: 3 }
        ]
    },
    {
        name: "Creamy Alfredo Pasta",
        category: "Pasta",
        description: "Penne pasta tossed in a rich and creamy Alfredo sauce.",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882c",
        basePrice: 11,
        prepTime: 14,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 3 }
        ],
        addons: [
            { name: "Grilled Chicken", price: 3 },
            { name: "Shrimp", price: 4 }
        ]
    },
    {
        name: "Spaghetti Bolognese",
        category: "Pasta",
        description: "Traditional Italian spaghetti served with slow-cooked beef bolognese sauce.",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
        basePrice: 12,
        prepTime: 15,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 3 }
        ],
        addons: [
            { name: "Extra Meat", price: 3 }
        ]
    },
    {
        name: "Penne Arrabbiata",
        category: "Pasta",
        description: "Spicy tomato sauce pasta with garlic and chili flakes.",
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
        basePrice: 10,
        prepTime: 12,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Extra Spicy", price: 1 }
        ],
        addons: [
            { name: "Parmesan", price: 1.5 }
        ]
    },
    {
        name: "Seafood Pasta",
        category: "Pasta",
        description: "Mixed seafood pasta with shrimp, calamari and garlic butter sauce.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c",
        basePrice: 15,
        prepTime: 16,
        variations: [
            { name: "Regular", price: 0 }
        ],
        addons: [
            { name: "Extra Shrimp", price: 4 }
        ]
    },
    {
        name: "Veggie Pasta",
        category: "Pasta",
        description: "Pasta with roasted vegetables and olive oil garlic sauce.",
        image: "https://images.unsplash.com/photo-1608756687911-aa1599ab2bd9",
        basePrice: 10,
        prepTime: 12,
        variations: [
            { name: "Regular", price: 0 }
        ],
        addons: [
            { name: "Extra Veggies", price: 2 }
        ]
    },
    {
        name: "Fresh Mojito",
        category: "Drinks",
        description: "A refreshing blend of lime, mint and soda.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
        basePrice: 5,
        prepTime: 3,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 2 }
        ],
        addons: [
            { name: "Extra Mint", price: 0.5 }
        ]
    },
    {
        name: "Chocolate Milkshake",
        category: "Drinks",
        description: "Rich chocolate milkshake made with premium ice cream.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
        basePrice: 6,
        prepTime: 4,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 2 }
        ],
        addons: [
            { name: "Whipped Cream", price: 1 }
        ]
    },
    {
        name: "Strawberry Smoothie",
        category: "Drinks",
        description: "Fresh strawberries blended with yogurt and honey.",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
        basePrice: 6,
        prepTime: 4,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 2 }
        ],
        addons: [
            { name: "Protein Boost", price: 2 }
        ]
    },
    {
        name: "Iced Coffee",
        category: "Drinks",
        description: "Cold brewed coffee served over ice with milk.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
        basePrice: 4,
        prepTime: 3,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 1.5 }
        ],
        addons: [
            { name: "Extra Shot", price: 1 }
        ]
    },
    {
        name: "Fresh Orange Juice",
        category: "Drinks",
        description: "Freshly squeezed orange juice with natural sweetness.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
        basePrice: 5,
        prepTime: 3,
        variations: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 2 }
        ],
        addons: [
            { name: "Extra Pulp", price: 0.5 }
        ]
    }
];
exports.default = menuSeed;
//# sourceMappingURL=menuSeed.js.map