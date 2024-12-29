"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import('@/components/properties/PropertyMap'), { ssr: false });

export default function PropertyPage({ countryName }: { countryName: string }) {
  return (
      <PropertyMap countryName={countryName} />
  );
}