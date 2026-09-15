import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import "./header.css";
import CartDropdown from "./CartDropdown";
import CartContext from "../contexts/CartContext";

export default function Header() {
  // Cart state shared through Context
  const { numberOfProductsInCart } = useContext(CartContext);

  // Controls the visibility of the cart dropdown
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", () => setIsCartOpen(false));

    return () => {
      document.body.addEventListener("click", () => setIsCartOpen(false));
    };
  }, []);

  return (
    <div className="sticky inset-0 z-40 bg-[rgba(244, 245, 241, 0.86)] backdrop-blur-3xl px-4">
      <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
        {/* Brand */}
        <span className="font-bold text-xl tracking-[0.06em] font-space-grotesk">
          SIGNAL
        </span>

        <div className="add-to-cart-btn-wrapper relative">
          {/* Cart button and product count */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCartOpen((prev) => !prev);
            }}
            className="w-11 h-11 rounded-full bg-surface flex justify-center items-center border border-line btn hover:bg-hover-btn-white"
          >
            <ShoppingCart className="w-5 h-5 font-light fill-none stroke-current stroke-[1.6] stroke-linecap-round stroke-linejoin-round" />

            {/* Product count badge */}
            <span
              key={numberOfProductsInCart}
              className={`cart-pop absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-semibold flex items-center justify-center transition-all duration-200 ${
                numberOfProductsInCart > 0
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            >
              {numberOfProductsInCart >= 100 ? "+99" : numberOfProductsInCart}
            </span>
          </button>

          {/* Cart dropdown */}
          <CartDropdown isCartOpen={isCartOpen} />
        </div>
      </div>

      <hr className="text-line" />
    </div>
  );
}
