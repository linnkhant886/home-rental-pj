import LoadingCard from "@/components/card/LoadingCard";
import Categories from "@/components/home/Categories";
import PropertyContainer from "@/components/home/PropertyContainer";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Example usage: fetch data or dynamically create metadata
  const slug = params.slug;
  const query = searchParams.query;

  return {
    title: slug ? `Page for ${slug}` : "Home",
    description: query ? `Search results for ${query}` : "Welcome to our website",
  };
}

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
