import Link from "next/link";
import { PropertyCardProps } from "../home/PropertyContainer";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function PropertyCard({
  property,
}: {
  property: PropertyCardProps;
}) {
  const { image, id: propertyId, name, tagline, country, price } = property;
  return (
    <div>
      <Link href={`/property/${propertyId}`}>
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
          <div className="relative h-[300px] aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
            <button
              className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition hover:scale-110 active:scale-95"
              aria-label="Add to favorites"
            >
              <Heart className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-gray-900">
                  {name.substring(0, 20)}
                </h3>
                <p className="text-sm text-gray-500">
                  {tagline.substring(0, 20)}
                </p>
              </div>
              {/* {rating && (
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">★ {rating.value}</span>
                  <span className="text-sm text-gray-500">
                    ({rating.count})
                  </span>
                </div>
              )} */}
            </div>

            <div className="mt-auto pt-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-semibold">${price}</span>
                  <span className="text-gray-500"> night</span>
                </div>
                <div className="text-sm text-gray-500">{country}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}