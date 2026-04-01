'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import api from '@/api/api'


const ProductContext = createContext()

export function ProductProvider({children}){

    const [menuItems, setMenuItems] = useState([])
    const [categories, setCategories] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [userCart, setUserCart] = useState([])



     const getAllItems = async() => {
            try {
                const res = await api.get("/products/all-items");
                console.log("All Items", res.data);
                setMenuItems(res.data)
    
            } catch (err) {
                console.log(err);
            }
        }  
     const getAllCategories = async() => {
            try {
                const res = await api.get("/products/all-categories");
                console.log("All Categories", res.data);
                setCategories(res.data)
    
            } catch (err) {
                console.log(err);
            }
        }  

        //// CART /////

        /// Add Item ///

        const addToCart = async(cartItem) => {
            try {
            const res = await api.post('/cart/add-to-cart', cartItem)
            console.log(res.data);
             await getCartItem();
            setCartItems(res.data)
            
        } catch (error) {
            console.log('cart',error);
            
        }
        }
        /// Get cart Item ///

        const getCartItem = async() => {
            try {
            const res = await api.post('/cart/cart-items')
            console.log('user cart',res.data);
            setUserCart(res.data)
            
        } catch (error) {
            console.log('cart',error);
            
        }
        }

        /// Clear cart ///
        const clearCart = async() => {
            try {
            const res = await api.post('/cart/clear-cart')
            console.log('clear cart',res.data);
             setUserCart([]);
            
        } catch (error) {
            console.log('cart',error); 
        }
        }

        /// USE EFFECT ////
        useEffect(() => {
            getAllItems()
            getAllCategories()
            getCartItem()
        },[])


    return <ProductContext.Provider value={{
        menuItems,
        categories,
        addToCart,
        cartItems, userCart,
        setUserCart,
        clearCart
    }}>
        {children}
    </ProductContext.Provider>

}

export function useProductContext() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useAuth must be used within ProductProvider');
    }
    return context;
}

