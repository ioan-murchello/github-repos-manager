import { useQuery } from "@tanstack/react-query";
import type { IGithubRepo } from "../types/types";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useGetPopularRepos = (language: string) => {
  const {
    data: popularRepos,
    isLoading: isLoadingPopularRepos,
    error,
  } = useQuery<IGithubRepo[]>({
    queryKey: ["popular-repos", language],
    queryFn: async () => {
      const res = await fetch(
        `/api/v1/repos/explore/${language}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error("Unable to fetch repos");
      return data.items;
    },

    enabled: !!language,
  });

  useEffect(() => {
    if (error) toast.error(error.message || "Unable to fetch repos", { id: "github-error" });
  }, [error]);

  return {
    popularRepos,
    isLoadingPopularRepos,
  };
};
