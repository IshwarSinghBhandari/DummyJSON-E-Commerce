import MainBanner from "@/components/homePage/MainBanner";
import Image from "next/image";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json()
}
export default async function Home() {
  const data = await getProducts()
  return (
    <section className="md:px-[8%] px-4">

      <MainBanner data={data.products} />
    </section>
  );
}
