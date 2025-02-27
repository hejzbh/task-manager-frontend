"use client";
import React from "react";

import Button from "@/components/ui/Button";
import Shortcut from "@/components/ui/Shortcut";

const CreateTaskButton = () => {
  return (
    <div className="space-x-2">
      {" "}
      <Button
        dataTitle="Create new task"
        variant="secondary"
        textProps={{ size: "xs" }}
      >
        Create task
      </Button>
      <Shortcut
        keys={["CTRL", "B"]}
        onShortcutPress={() => {
          alert("ha");
        }}
      />
    </div>
  );
};

export default CreateTaskButton;
