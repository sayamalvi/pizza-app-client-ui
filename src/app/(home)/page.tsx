import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";

const products: Product[] = [
  {
    id: 1,
    name: 'Pizza Margherita',
    price: 12.99,
    image: '/pizza-main.png',
    description: 'Tomato sauce, mozzarella, fresh basil'
  },
  {
    id: 2,
    name: 'Pizza Pepperoni',
    price: 14.99,
    image: '/pizza-main.png',
    description: 'Tomato sauce, mozzarella, pepperoni'
  },
  {
    id: 3,
    name: 'Pizza Quattro Stagioni',
    price: 16.99,
    image: '/pizza-main.png',
    description: 'Tomato sauce, mozzarella, ham, artichokes, mushrooms, olives, oregano'
  },
  {
    id: 4,
    name: 'Pizza Quattro Formaggi',
    price: 18.99,
    image: '/pizza-main.png',
    description: 'Tomato sauce, mozzarella, gorgonzola, fontina, parmesan'
  },
  {
    id: 5,
    name: 'Pizza Capricciosa',
    price: 17.99,
    image: '/pizza-main.png',
    description: 'Tomato sauce, mozzarella, ham, artichokes, mushrooms'
  },
  {
    id: 6,
    name: 'Pizza Marinara',
    price: 13.99,
    image: '/pizza-main.png',
    description: 'Tomato sauce, garlicc'
  },
]

export default function Home() {
  return (
    <>
      <section className="bg-white p-[5rem]">
        <div className="container flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black font-sans leading-2">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image alt="pizza-main" src={'/pizza-main.png'} width={400} height={400} />
          </div>
        </div>
      </section>
      <section className="p-[5rem]">
        <div className="container py-12">
          <Tabs defaultValue="pizza" className="">
            <TabsList>
              <TabsTrigger className="text-md" value="pizza">
                Pizza
              </TabsTrigger>
              <TabsTrigger className="text-md" value="beverages">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product: Product) => {
                  return (
                    <ProductCard key={product.id} product={product} />
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              beverages List
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>

  );
}
