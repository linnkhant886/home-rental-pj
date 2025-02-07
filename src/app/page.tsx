import LoadingCard from "@/components/card/LoadingCard";
import Categories from "@/components/home/Categories";
import PropertyContainer from "@/components/home/PropertyContainer";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;



async function Home(props: { params: Params; searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const category = searchParams?.category as string | undefined;
  const search = searchParams?.search as string | undefined;

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
