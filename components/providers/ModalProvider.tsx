"use client";
import { ModalType, useModal } from "@/hooks/use-modal";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Modals (DYNAMIC - Because we want to import them only when its needed - based on user interactions, which modal user choosen etc...)
const CreateNewTaskModal = dynamic(
  () => import("@/modules/tasks/components/modals/CreateTaskModal")
);
const EditTaskModal = dynamic(
  () => import("@/modules/tasks/components/modals/EditTaskModal")
);
const DeleteTaskModal = dynamic(
  () => import("@/modules/tasks/components/modals/DeleteTaskModal")
);

const ModalProvider = () => {
  const { modal, closeModal } = useModal();

  // Close on ESCAPE
  useEffect(() => {
    function closeModalOnX(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }

    window.addEventListener("keydown", closeModalOnX);

    return () => window.removeEventListener("keydown", closeModalOnX);
  }, []);

  function DynamicModal({ modal }: { modal: ModalType }) {
    switch (modal) {
      case "createNewTask":
        return <CreateNewTaskModal />;
      case "deleteTask":
        return <DeleteTaskModal />;
      case "editTask":
        return <EditTaskModal />;
      default:
        return null;
    }
  }

  if (!modal) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 p-5 w-full h-full bg-black/90 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-10 rounded-xl w-full md:w-[800px] border-[1.5px] border-white/50 bg-bgColors-modal
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateX: 40,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            rotateX: 10,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <DynamicModal modal={modal} />
        </motion.div>
      </div>
    </div>
  );
};

export default ModalProvider;
