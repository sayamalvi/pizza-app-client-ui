import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import ProductCard from "./product-card";

const ProductList = async ({ searchParams }: { searchParams: { tenantId: string } }) => {
    const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
        next: {
            revalidate: 3600,
        },
    })
    if (!categoryResponse.ok) {
        throw new Error('Failed to fetch categories')
    }
    const categories: Category[] = await categoryResponse.json()

    const productsResponse = await fetch(
        `${process.env.BACKEND_URL}/api/catalog/products?tenantId=${searchParams.tenantId}`,
        {
            next: {
                revalidate: 3600,

            },
        }
    );

    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }
    const { products }: { products: Product[] } = await productsResponse.json();
    return (
        <section className="p-[5rem]">
            <div className="container py-12">
                <Tabs defaultValue={categories[0]._id} className="">
                    <TabsList>
                        {categories.map((category) => {
                            return (
                                <TabsTrigger
                                    key={category._id}
                                    value={category._id}
                                    className="text-md">
                                    {category.name}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    {categories.map((category) => {
                        return (
                            <TabsContent key={category._id} value={category._id}>
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {products
                                        .filter(
                                            (product) => product.category._id === category._id
                                        )
                                        .map((product) => (
                                            <ProductCard product={product} key={product._id} />
                                        ))}
                                </div>
                            </TabsContent>
                        );
                    })}
                    <TabsContent value="pizza">
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            {products.map((product: Product) => {
                                return (
                                    <ProductCard key={product._id} product={product} />
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
    )
}

export default ProductList