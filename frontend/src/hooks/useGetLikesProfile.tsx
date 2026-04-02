import { useQuery } from "@tanstack/react-query";

export const useGetLikesProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["liked-profiles"],
    queryFn: async () => {
      const res = await fetch("/api/v1/users/liked-profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch likes");
      return data.likedProfiles;
    },
    retry: false,
  });

  return {
    likedProfiles: data || [],
    isLoading,
    error,
  };
};
