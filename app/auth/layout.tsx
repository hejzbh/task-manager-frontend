import { MoveUp } from "@/components/ui/animated/MoveUp";
import Text from "@/components/ui/Text";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 h-[100dvh] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020617 0%, #392381 100%)",
      }}
    >
      <MoveUp className="md:p-20 flex items-center justify-center flex-col h-[350px] md:h-full">
        <Image
          src={"/images/shape.png"}
          loading="lazy"
          width={350}
          height={500}
          alt="Shape"
          className="w-[150px] md:w-[300px]"
        />{" "}
        <Text>Manage your tasks like a pro</Text>
      </MoveUp>

      <main className="h-full">{children}</main>
    </div>
  );
}
