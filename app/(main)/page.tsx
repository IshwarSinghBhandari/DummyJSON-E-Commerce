import ProductPage from "@/components/product/ProductPage";
import { ROUTE } from "../util/pageRoutes";

const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTE.API.CATEGORIES}`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];
    const data = await response.json();


    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const categories = await fetchCategories()
  const paramsData = await searchParams;
  const params = new URLSearchParams({
    limit: "12",
    skip: paramsData?.skip || "0",
  });
  if (paramsData?.search) params.append("searchData", paramsData.search); 
  if (paramsData?.category) params.append("category", paramsData.category);
  if (paramsData?.sortBy) params.append("sortBy", paramsData.sortBy);
  if (paramsData?.order) params.append("order", paramsData.order);

  const productRes = await fetch(` ${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${params.toString()}`,
    { cache: "no-store" });


  const productData = await productRes.json();
  
  return (
    <section className="md:px-[8%] px-4">

<ProductPage
        category={categories}
        products={productData.products}
        total={productData.total}
        searchParams={searchParams}
      />
    </section>
  );
}
