import React from "react";
import { FocusCards } from "@/components/ui/animated/Focus";
import Text from "@/components/ui/Text";

const DashboardPage = () => {
  return (
    <div className="flex flex-col space-y-7 items-center justify-center h-full">
      <Text size="3xl" className="text-center">
        Do it like a pro.
      </Text>
      <FocusCards
        cards={[
          {
            title: "Create Tasks",
            src: "/images/card-1.webp",
          },
          {
            title: "Manage Tasks",
            src: "/images/card-2.webp",
          },
          {
            title: "Filter Tasks",
            src: "/images/card-3.webp",
          },
        ]}
      />
    </div>
  );
};

export default DashboardPage;
