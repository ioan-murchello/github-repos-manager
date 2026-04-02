import { motion, AnimatePresence } from "framer-motion";
import Repo from "./Repo";
import type { IGithubRepo, RepoSortType } from "../types/types";
import SortRepos from "./SortRepos";
import { useMemo, useState } from "react";

const Repos = ({ repos: userRepos }: { repos: IGithubRepo[] }) => {
  const [sortType, setSortType] = useState<RepoSortType>("stars");

  const displayRepos = useMemo(() => {
    if (!userRepos) return [];

    const reposCopy = [...userRepos];

    if (sortType === "stars") {
      return reposCopy.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      return reposCopy.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortType === "recent") {
      return reposCopy.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    return reposCopy;
  }, [userRepos, sortType]);

  return (
    <div className="w-full flex flex-col overflow-hidden relative glass p-2 rounded-lg">
      <SortRepos setSortType={setSortType} sortType={sortType} />
      <div className="w-full relative flex-1 overflow-y-auto custom-scrollbar rounded-lg">
        <ol className="flex flex-col gap-5 sm:p-4">
          <AnimatePresence mode="popLayout">
            {displayRepos?.map((repo) => (
              <motion.li
                key={repo.id}
                layout 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                }}
              >
                <Repo repo={repo} />
              </motion.li>
            ))}
          </AnimatePresence>

          {displayRepos.length === 0 && (
            <p className="flex items-center justify-center h-32">
              No repos found
            </p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Repos;
