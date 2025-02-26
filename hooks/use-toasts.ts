"use client";
import { create } from "zustand";

export type ToastType = {
  id: number;
  message: string;
  duration?: number; // ms
  variant: "error" | "success";
};

interface ToastsStore {
  toasts: ToastType[];
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"; // TODO: Implement this logic in ToastsProvider.tsx component
  showToast: (newToast: Omit<ToastType, "id"> & { id?: number }) => void;
}

export const useToasts = create<ToastsStore>((set, store) => ({
  toasts: [],
  position: "top-center",
  showToast: (newToast) => {
    if (store().toasts.length > 5) return; // Maybe someone spams action and triger a lot of toasts

    newToast.duration = newToast.duration || 3000; // set default duration if not provided
    newToast.id = Math.random();

    set((store) => ({ toasts: [...store.toasts, newToast as ToastType] }));

    // Remove toast once duration expires
    setTimeout(() => {
      set((store) => ({
        toasts: store.toasts?.filter(
          (existingToast) => existingToast.id !== newToast.id
        ),
      }));
    }, newToast.duration);
  },
}));
