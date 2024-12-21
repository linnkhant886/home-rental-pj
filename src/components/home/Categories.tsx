import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import { categories, Category } from "../form/CategoriesInput";
import Link from "next/link";

export default function Categories({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <section>
      <ScrollArea className="py-6">
        <div className=" flex gap-x-4 ">
          {categories.map((item: Category) => {
            const isActive = item.label === category;
            return (
              <Link
                key={item.label}
                href={`/?category=${item.label}${searchTerm}`}
              >
                <article
                  className={` p-3 flex flex-col duration-300 items-center gap-2 w-[100px] hover:text-primary cursor-pointer ${
                    isActive && "text-primary"
                  }`}
                >
                  <item.icon className=" h-8 w-8" />
                  <p className="capitalize">{item.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <Scrollbar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
