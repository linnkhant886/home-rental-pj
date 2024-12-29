import Image from "next/image";

export default function Userinfo({
  firstName,
  userImage,
}: {
  firstName: string;
  userImage: string;
}) {
  return (
    <div className="grid  grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        width={50}
        height={50}
        src={userImage}
        alt={firstName}
        className="w-12 h-12 object-cover rounded"
      />

      <div>
        <p>Hosted by <span className="font-semibold">{firstName}</span></p>
        <p className="text-muted-foreground">Superhost · 2 years hosting</p>
      </div>
    </div>
  );
}
