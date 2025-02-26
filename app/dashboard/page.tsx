import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <Link href={"/dashboard/sub"}>Click here</Link>
    </div>
  );
};

export default DashboardPage;
