import ProductDetailPage from "@/components/product/productDetail/ProductDetailPage";
import { ROUTE } from "@/app/util/pageRoutes";
import { ProductDetail } from "@/app/types/product";


export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    let product: ProductDetail | null = null;
    let error: string | null = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTE.API.PRODUCTS}/${id}`,
            { cache: "no-store" }
        );
        const data = await res.json();
    
            product = data as ProductDetail;

    } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
    return (
        <>
            <section className="md:px-[8%] px-4">
                <ProductDetailPage product={product} error={error} />
            </section>
        </>
    );
}
