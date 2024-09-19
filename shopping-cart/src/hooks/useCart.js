import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";

export const useCart = () => {
    const cart = useContext(CartContext)

    //Buena practica, comprobar el contexto
    //Para que esto solo se pueda usar dentro de un contexto
    //En el que se muestre el carrito
    if (cart === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return cart
}