import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import "./ModalMoreDescriptionProduct.css";

export default function ModalMoreDescriptionProduct({ product }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const { getCurrentPrice } = useContext(CartContext);

  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";

      window.scrollTo(0, scrollY);
    };
  }, []);
  
  return (
    <div className="bg-white w-full max-w-120 rounded-l-3xl p-8 flex flex-col gap-5 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hidden">
      {/* images */}
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="w-full max-w-56 p-4 bg-accent-soft rounded-2xl">
          <img src={product.images[selectedImg]} alt={product.title} />
        </div>
        <div className="flex items-center gap-2.5">
          {product.images.slice(0, 3).map((img, index) => (
            <div
              key={img}
              onClick={() => setSelectedImg(index)}
              className={`w-11 h-11 p-1.5 rounded-xl bg-accent-soft flex items-end justify-center
      hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-2
      ${selectedImg === index ? "border-accent" : "border-transparent"}`}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between font-semibold text-ink-muted text-[11px] ">
        <span className="uppercase tracking-widest flex items-center gap-1">
          <span>{product.brand}</span>
          <span className="text-[10px] leading-none">·</span>
          <span>{product.category}</span>
        </span>
        <div className="rating flex gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => {
              const rating = product.rating;

              return (
                <div key={star} className="relative w-4 h-4">
                  {/* Empty star */}
                  <Star size={14} className="text-gray-300" />

                  {/* Full / Half star */}
                  {rating >= star - 0.5 && (
                    <div
                      className={`absolute top-0 left-0 overflow-hidden ${
                        rating >= star ? "w-full" : "w-1/2"
                      }`}
                    >
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className=" ">{product.rating.toFixed(1)}</div>
        </div>
      </div>
      <div className="font-space-grotesk font-semibold text-2xl text-center">
        {product.title}
      </div>
      <div className="flex justify-center items-center gap-2.5">
        <del className="text-xs text-ink-muted font-medium">
          ${product.price}
        </del>
        <strong className="font-space-grotesk font-bold text-accent">
          $<span>{getCurrentPrice(product)}</span>
        </strong>
        <div className=" px-2 py-1 rounded-full bg-gold-soft text-gold-dark text-xs font-semibold flex justify-center items-center">
          -{Math.round(product.discountPercentage)}%
        </div>
      </div>
      <p className="text-[15px] leading-6 text-ink-muted mb-2.5">
        {product.description}
      </p>
      <hr className="text-line" />
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-ink-muted">Warranty</span>
          <span className="font-medium">{product.warrantyInformation}</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-ink-muted">Shipping</span>
          <span className="font-medium">{product.shippingInformation}</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-ink-muted">Returns</span>
          <span className="font-medium">{product.returnPolicy}</span>
        </div>
      </div>
    </div>
  );
}
