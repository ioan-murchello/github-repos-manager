import { useQuery } from "@tanstack/react-query";
import type { IGithubProfile, IGithubRepo } from "../types/types.ts";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useGetProfile = (username: string = "") => {
  const {
    data: userData,
    isFetching: isLoadingProfile,
    isPending,
    error,
  } = useQuery<[IGithubProfile, IGithubRepo[]]>({
    queryKey: ["user-data", username],
    queryFn: async () => {
      const res = await fetch(
        `/api/v1/users/profile/${username}`,
      );

      if (res.status === 404) {
        throw new Error("User not found");
      }

      if (!res.ok) throw new Error("Unable to fetch user profile");
      return res.json();
    },
    enabled: !!username,
  });

  useEffect(() => {
    if (error)
      toast.error(error.message || "Unable to fetch user profile", {
        id: "github-error",
      });
  }, [error]);

  return {
    userProfile: userData?.[0] || null,
    userRepos: userData?.[1] || [],
    isLoadingProfile,
    isPending,
  };
};
