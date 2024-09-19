/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";

//Se crea porque el carrito se mostrara siempre y segun cambie el carrito,
// tambien cambiaran los botones de los productos
export const CartContext = createContext()

function useCartReducer () {
    // Se podria hacer un custom hook
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    
    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })
    
    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })
    
    const clearCart = () => dispatch({
        type: 'CLEAR_CART',
    })

    return { state, addToCart, removeFromCart, clearCart }
}

// la dependencia de usar react context es minima
export function CartProvider({ children }) {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()
    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}
        >
        {children}
        </CartContext.Provider>
    )
}