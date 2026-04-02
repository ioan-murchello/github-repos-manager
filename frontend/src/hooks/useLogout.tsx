import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async (): Promise<void> => {
      const res = await fetch("/api/v1/auth/logout", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
      return res.json();
    },
    onSuccess: () => {
      // clear cashed auth user data
      queryClient.setQueryData(["auth-user"], null);
      toast.success("Logged out successfully", { id: "logout-success" });
    },
  });

  return logout;
};
