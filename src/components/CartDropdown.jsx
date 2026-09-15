import { useContext } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import CartContext from "../contexts/CartContext";

const CartDropdown = ({ isCartOpen }) => {
  const {
    productsInCart,
    removeFromCart,
    numberOfProductsInCart,
    getCurrentPrice,
  } = useContext(CartContext);

  const subtotal = productsInCart
    .reduce((acc, curr) => acc + curr.quantity * getCurrentPrice(curr), 0)
    .toFixed(2);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`cart-wrapper absolute right-0 top-13 w-72 sm:w-80
    bg-surface rounded-[14px] p-4 border border-line shadow-lg
    transition-all duration-200 ease-out
    ${
      isCartOpen
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0 pointer-events-none"
    }
  `}
    >
      <div className="header flex justify-between items-center pb-4 ">
        <h1 className="text-sm font-semibold font-space-grotesk">Your Cart</h1>
        <span className="font-medium text-xs text-ink-muted">
          <span>{numberOfProductsInCart}</span> items
        </span>
      </div>
      <div className=" text-center">
        {numberOfProductsInCart > 0 ? (
          <div className="content">
            <div className="max-h-50 overflow-y-auto pr-2">
              {productsInCart.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center gap-2.5 mb-2 px-1 py-2 hover:bg-primary-background rounded-lg"
                >
                  <span className="text-xs">{product.title}</span>
                  <div className="text-xs flex items-center gap-2.5">
                    <span className="text-ink-muted">x{product.quantity}</span>
                    <span className="font-semibold">
                      $
                      {(getCurrentPrice(product) * product.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex items-center justify-center text-ink-muted btn hover:text-[#B3453D] p-1 hover:bg-[rgba(179,69,61,0.08)] rounded-[6px]"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <hr className="text-line my-4" />
            <div className="flex justify-between items-center font-space-grotesk font-bold text-[13px]">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
          </div>
        ) : (
          <span className="text-ink-muted text-sm">Your cart is empty.</span>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
