import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <Image src="404.svg" width={300} height={300} alt="404" />
      <div className="mt-8 text-lg font-medium">
        Well, howdy partner! You just hit a tumbleweed page – nothing but
        emptiness here.
      </div>
      <Link href="/" className="border hover:outline p-2 mt-7 font-medium">
        Return Home
      </Link>
      <h1 className="absolute bottom-8 text-2xl font-bold">Next Todo</h1>
    </div>
  );
}
