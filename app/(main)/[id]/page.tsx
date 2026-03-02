import ProductDetailPage from "@/components/product/productDetail/ProductDetailPage";


export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <>
            <section className="md:px-[8%] px-4">
                <ProductDetailPage id={id} />
            </section>
        </>
    );
}
