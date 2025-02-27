"use client";
import React from "react";

import Button from "@/components/ui/Button";

import { useModal } from "@/hooks/use-modal";
import dynamic from "next/dynamic";

const Shortcut = dynamic(() => import("@/components/ui/Shortcut"));

const CreateTaskButton = ({
  includeShortcut,
  className = "",
}: {
  includeShortcut?: boolean;
  className?: string;
}) => {
  const { showModal } = useModal();

  return (
    <div className={`${className}`}>
      {" "}
      <Button
        dataTitle="Create new task"
        variant="secondary"
        onClick={() => showModal("createNewTask")}
        textProps={{ size: "xs" }}
        className="w-full"
      >
        Create task
      </Button>
      {includeShortcut && (
        <Shortcut
          className="mb-2"
          keys={["CTRL", "B"]}
          onShortcutPress={() => showModal("createNewTask")}
        />
      )}
    </div>
  );
};

export default CreateTaskButton;
