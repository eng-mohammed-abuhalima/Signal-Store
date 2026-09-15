import { ArrowUpRight, CheckIcon, MinusIcon, Plus, Star } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import CartContext from "../contexts/CartContext";
import ModalMoreDescriptionProduct from "./Modals/ModalMoreDescriptionProduct";
import Modal from "./Modals/Modal";

export default function ProductCard({ product }) {
  // Get cart functions from Context instead of passing them through props
  const { addToCart, getCurrentPrice } = useContext(CartContext);

  // Controls which product image is visible on hover
  const [isHovered, setIsHovered] = useState(false);

  // Product quantity starts at the minimum allowed quantity
  const [qyt, setQyt] = useState(product.minimumOrderQuantity);

  // Controls the temporary "Added" state after adding the product to cart
  const [isAdded, setIsAdded] = useState(false);

  // Controls whether the product description modal is open
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Stores the timeout ID so it can be cancelled when the component unmounts
  const timeRef = useRef(null);

  // Cleanup the timeout when the ProductCard is removed from the DOM
  useEffect(() => {
    return () => clearTimeout(timeRef.current);
  }, []);

  // Store the second image in a variable because it is used more than once
  const secondImage = product.images[1];

  // Preload the second image so it is ready when the user hovers over the product
  useEffect(() => {
    const img = new Image();
    img.src = secondImage;
  }, [secondImage]);

  // Prevent the page from scrolling while the product modal is open
  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "";
  }, [isOpenModal]);

  // Store the minimum quantity in a shorter variable for easier access
  const minimumOrderQuantity = product.minimumOrderQuantity;

  return (
    <article className="product-wrapper rounded-2xl w-full bg-white border border-line overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product images and discount badge */}
      <div className="img-wrapper w-full h-72 flex justify-center items-center overflow-hidden rounded-t-2xl py-5 bg-accent-soft relative">
        {/* Image container used to detect mouse hover */}
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main product image */}
          <img
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            src={product.thumbnail}
            alt={product.title}
          />

          {/* Second image shown when the user hovers over the product */}
          <img
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={secondImage}
            alt={product.title}
          />
        </div>

        {/* Product discount percentage */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black text-white text-xs font-semibold flex justify-center items-center">
          -{Math.round(product.discountPercentage)}%
        </div>
      </div>

      {/* Product information and controls */}
      <div className="info p-4.5">
        {/* Brand and rating */}
        <div className="flex justify-between items-start">
          {/* Product brand */}
          <h2 className="brand text-xs font-semibold tracking-widest uppercase text-ink-muted mb-2.5">
            {product.brand}
          </h2>

          {/* Product rating */}
          <div className="rating flex gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = product.rating;

                return (
                  <div key={star} className="relative w-4 h-4">
                    {/* Empty star shown as the background */}
                    <Star size={16} className="text-gray-300" />

                    {/* Full or half-filled star displayed on top */}
                    {rating >= star - 0.5 && (
                      <div
                        className={`absolute top-0 left-0 overflow-hidden ${
                          rating >= star ? "w-full" : "w-1/2"
                        }`}
                      >
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Numeric rating */}
            <div className="text-ink-muted text-xs">
              {product.rating.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Product title */}
        <div className="flex justify-between items-start font-space-grotesk font-semibold mb-2.5">
          <h1 className="name text-lg leading-5">{product.title}</h1>
        </div>

        {/* Original price and discounted price */}
        <div className="flex items-center gap-2.5">
          {/* Original price */}
          <del className="text-xs text-ink-muted font-medium">
            ${product.price}
          </del>

          {/* Current price after discount */}
          <strong className="font-space-grotesk font-bold text-accent">
            $<span>{getCurrentPrice(product)}</span>
          </strong>
        </div>

        {/* Product description */}
        <div>
          <p className="text-sm leading-6 text-ink-muted line-clamp-2 mb-2.5">
            {product.description}
          </p>

          {/* Open modal to show the full product description */}
          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="group relative flex items-center gap-1 text-xs font-semibold cursor-pointer
             after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0
             after:bg-current after:transition-all after:duration-300
             hover:after:w-full mb-7"
          >
            More <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quantity controls and Add to Cart button */}
        <div className="controlar-btns flex justify-between items-center">
          {/* Quantity selector */}
          <div className="count-btns min-w-[105px] max-w-28 flex items-center gap-3 border border-line px-1 py-1 rounded-full">
            {/* Decrease quantity */}
            <button
              onClick={() => {
                // Do not allow quantity to go below the minimum order quantity
                if (qyt === minimumOrderQuantity) return;

                setQyt((prev) => prev - 1);
              }}
              className={`rounded-full w-7 h-7 flex items-center justify-center ${
                qyt === minimumOrderQuantity
                  ? "cursor-not-allowed"
                  : "btn hover:bg-hover-btn-white"
              }`}
            >
              <MinusIcon
                className={`w-3.5 h-3.5 ${
                  qyt != minimumOrderQuantity ? "" : "text-[#c7cac3]"
                }`}
              />
            </button>

            {/* Current quantity */}
            <span className="text-sm font-semibold flex items-center justify-center">
              {qyt}
            </span>

            {/* Increase quantity */}
            <button
              onClick={() => {
                setQyt((prev) => prev + 1);
              }}
              className="rounded-full hover:bg-hover-btn-white w-7 h-7 flex items-center justify-center btn"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add product to cart */}
          <button
            type="button"
            disabled={isAdded}
            onClick={() => {
              // Add the selected quantity of the product to the cart
              addToCart(product, qyt);

              // Show success notification
              toast.success(product.title + " added to cart!");

              // Temporarily change the button to "Added"
              setIsAdded(true);

              // Store the timer ID so it can be cancelled during cleanup
              timeRef.current = setTimeout(() => setIsAdded(false), 2000);
            }}
            className={`w-28 h-11 flex items-center justify-center rounded-full transition-all duration-300 text-white text-sm gap-2 bg-accent ${
              isAdded === true
                ? "bg-green-800 cursor-not-allowed"
                : "bg-accent hover:bg-accent-dark hover:shadow-lg active:scale-95 cursor-pointer"
            }`}
          >
            {/* Change button content while the product is temporarily marked as added */}
            {isAdded ? (
              <>
                <CheckIcon className="w-4 h-4" />
                Added
              </>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>

        {/* Minimum order quantity */}
        <span className="text-[10px] text-ink-muted ml-2">
          Min {minimumOrderQuantity}
        </span>
      </div>

      {/* Product details modal */}
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <ModalMoreDescriptionProduct product={product} />
      </Modal>
    </article>
  );
}
