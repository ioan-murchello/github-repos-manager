import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLikeProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: likeProfile, error } = useMutation({
    mutationFn: async (username: string) => {
      const res = await fetch(
        `/api/v1/users/like-profile/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to like profile.");
      }
        return data;
    },
    onSuccess: (data) => {
      toast.success(data.message, { id: "like-success" });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["liked-profiles"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to like profile.";
      toast.error(errorMessage || "Failed to like profile.", {
        id: "like-error",
      });
    },
  });
  return { likeProfile, error };
};
