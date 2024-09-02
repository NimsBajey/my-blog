import { getAllCategories } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <main className="p-4 sm:p-8 lg:p-10">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories?.map((category, key) => {
          return <CategoryCard category={category} key={key} />;
        })}
      </section>
    </main>
  );
}

function CategoryCard({ category }) {
  return (
    // <Link href={`/categories/${category?.id}`}>
      <div className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-200 rounded-xl p-4 sm:p-6">
        <img
          className="h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12 object-cover rounded-full"
          src={category?.iconURL}
          alt=""
        />
        <h1 className="text-sm sm:text-base md:text-lg font-bold text-center">{category?.name}</h1>
      </div>
    // </Link>
  );
}
