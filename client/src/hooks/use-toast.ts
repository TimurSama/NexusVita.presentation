import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
    error: (message: string) => sonnerToast.error(message),
    success: (message: string) => sonnerToast.success(message),
  };
}

export { sonnerToast as toast };
