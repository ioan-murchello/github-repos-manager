import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUnlikeProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: unlikeProfile } = useMutation({
    mutationFn: async (username: string) => {
      const response = await fetch(
        `/api/v1/users/unlike-profile/${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to unlike profile");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Profile unliked successfully", { id: "unlike-success" });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["liked-profiles"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to unlike profile";
      toast.error(errorMessage, { id: "unlike-error" });
    },
  });

  return unlikeProfile
};
