import cartContext from "./CartContext";
import { useEffect, useState } from "react";

export default function CartProvider({ children }) {
  // Cart state initialized with saved data from localStorage
  const [productsInCart, setProductsInCart] = useState(
    () => JSON.parse(localStorage.getItem("productsInCart")) || [],
  );

  // Keep localStorage synchronized with the cart state
  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  // Total quantity of all products in the cart
  const numberOfProductsInCart = productsInCart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  // Calculate the current product price after discount
  const getCurrentPrice = (product) => {
    return Number(
      (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2),
    );
  };

  const addToCart = (product, qyt) => {
    setProductsInCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === existingProduct.id
            ? { ...item, quantity: item.quantity + qyt }
            : item,
        );
      }
      return [...prev, { ...product, quantity: qyt }];
    });
  };

  const removeFromCart = (productId) => {
    setProductsInCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    // زيادة الكمية
  };

  return (
    <cartContext.Provider
      value={{
        productsInCart,
        addToCart,
        removeFromCart,
        numberOfProductsInCart,
        getCurrentPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
