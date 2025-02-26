import { MoveUp } from "@/components/ui/animated/MoveUp";
import Text from "@/components/ui/Text";
import Image from "next/image";
import Link from "next/link";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex justify-between items-center flex-col lg:flex-row h-[100dvh] overflow-hidden pt-10"
      style={{
        background: "linear-gradient(135deg, #020617 0%, #392381 100%)",
      }}
    >
      <MoveUp className="lg:basis-[50%] md:p-20 flex items-center justify-center flex-col">
        <Image
          src={"/images/shape.png"}
          loading="eager"
          width={350}
          height={500}
          alt="Shape"
          className="w-full max-w-[100px] md:max-w-[150px] lg:max-w-[300px]"
        />{" "}
        <Text size="lg">Manage your tasks like a pro</Text>
        <Link href={"/"} className="flex items-center text-sm mt-5">
          <BsArrowReturnLeft className="mr-2" /> Go to homepage
        </Link>
      </MoveUp>

      <main className="lg:basis-[50%] h-full flex justify-center items-center w-full">
        {children}
      </main>
    </div>
  );
}
