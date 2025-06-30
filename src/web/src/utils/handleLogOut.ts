import { toast } from "sonner";
import { logoutWithRedirect } from "./auth";

export const handleLogout = () => {
  // Show confirmation toast
  toast.success("Logout realizado com sucesso!");

  // Perform logout with redirect
  logoutWithRedirect();
};