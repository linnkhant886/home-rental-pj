import LoadingCard from "@/components/card/LoadingCard";
import Categories from "@/components/home/Categories";
import PropertyContainer from "@/components/home/PropertyContainer";
import { Suspense } from "react";

async function Home({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const { category, search } = await searchParams;
  return (
      <section>
        <Categories category={category} search={search} />

        <Suspense fallback={<LoadingCard />}>
          <PropertyContainer category={category} search={search} />
        </Suspense>
      </section>
  );
}

export default Home;
