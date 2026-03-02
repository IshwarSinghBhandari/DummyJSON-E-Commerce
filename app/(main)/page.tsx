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
    const normalized = data.map((cat: any) =>
      typeof cat === "string"
        ? { slug: cat, name: cat.replace("-", " "), url: "" }
        : cat
    );

    return normalized;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export default async function Home() {
  const categories = await fetchCategories()
  
  return (
    <section className="md:px-[8%] px-4">

      <ProductPage
        categories={categories}
      />
    </section>
  );
}
