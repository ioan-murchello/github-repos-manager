import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await fetch("/api/v1/auth/check", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return null;
      return data.user;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch auth status:", error);
      toast.error("Failed to verify authentication status. Please try again.", {
        id: "auth-error",
      });
    }
  }, [error]);

  return {
    user: data,
    isAuthenticated: !!data,
    isLoading,
  };
};
