import Categories from "@/components/home/Categories";
import PropertyContainer from "@/components/home/PropertyContainer";

async function Home({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const { category, search } = await searchParams;
  return (
    <div>
      <section>
        <Categories category={category} search={search} />
        <PropertyContainer category={category} search={search} />
      </section>
    </div>
  );
}

export default Home;
