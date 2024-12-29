import Image from "next/image";

export default function ImageContainer({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="relative h-[300px] md:h-[600px] mt-8 overflow-hidden rounded-md bg-gray-100 ">
      <Image
        fill
        sizes="100vw"
        className="rounded-md object-cover"
        src={image}
        alt={name}
      />
    </div>
  );
}
