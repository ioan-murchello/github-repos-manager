import ProfileInfo from "../components/ProfileInfo.tsx";
import Search from "../components/Search.tsx";
import Repos from "../components/Repos.tsx";
import { useEffect } from "react";

import { useGetProfile } from "../hooks/useGetProfile.tsx";
import History from "../components/History.tsx";
import { useAddToHistory, useSearchQuery } from "../store/store.ts";
import { AnimatePresence, motion } from "framer-motion";

const HomePage = () => {
  const searchQuery = useSearchQuery();

  const addToHistory = useAddToHistory();

  const { userProfile, userRepos, isLoadingProfile } = useGetProfile(searchQuery);

  useEffect(() => {
    if (userProfile) {
      addToHistory({
        username: userProfile.login,
        name: userProfile.name,
        avatarUrl: userProfile.avatar_url,
        html_url: userProfile.html_url,
        _id: userProfile.id,
      });
    }
  }, [userProfile, addToHistory]);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top Controls */}
      <div className="flex flex-col items-stretch gap-3 mb-4 w-full max-w-3xl mx-auto">
        <Search />

        <AnimatePresence mode="wait">
          {!userProfile && (
            <motion.div
              key="history-section"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <History />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
        <AnimatePresence mode="wait">
          {userProfile ? (
            <motion.div
              key="results-grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 
              h-auto
              lg:h-[70vh]
              grid-cols-1 
              lg:grid-cols-[1fr_1.5fr]"
            >
              <ProfileInfo userProfile={userProfile} />
              <Repos repos={userRepos} />
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center "
            >
              {!isLoadingProfile && (
                <p className="text-xl sm:text-2xl lg:text-3xl font-light opacity-50 text-center">
                  Find some repos
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;
