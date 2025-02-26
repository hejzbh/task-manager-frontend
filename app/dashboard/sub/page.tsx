import { axiosInstance } from "@/lib/axios";
import React from "react";

const page = () => {
  async function getData() {
    axiosInstance.get("/tasks").then(console.log);
  }

  return (
    <div>
      <button>Fetch somethign</button>
    </div>
  );
};

export default page;
