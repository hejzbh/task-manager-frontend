"use client";
import { create } from "zustand";

export type ModalType = "createNewTask" | "deleteTask" | "editTask";
export type ModalData = any; // TODO

interface ModalStore {
  modal: ModalType | null;
  data: ModalData | null;
  showModal: (modal: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  modal: null,
  data: null,
  showModal: (modal, data) => set({ modal, data }),
  closeModal: () => set({ modal: null, data: null }),
}));
