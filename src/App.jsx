import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import CartProvider from "./contexts/CartProvider";

export default function App() {
  return (
    <CartProvider>
      <div className="bg-primary-background min-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <main className="max-w-7xl mx-auto px-4">
          <Hero />
          <section className="products pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </section>
        </main>
      </div>
    </CartProvider>
  );
}
