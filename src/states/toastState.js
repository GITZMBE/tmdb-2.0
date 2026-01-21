import { atom } from "recoil";

// export type ToastType = "success" | "error" | "info" | "warning";

// export interface Toast {
//   id: number;
//   message: string;
//   type: ToastType;
//   duration: number;
// }

export const toastState = atom({
  key: "toastState",
  default: [],
});
