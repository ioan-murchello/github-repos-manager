import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchQuery, useSetSearchQuery } from "../store/store";
import { useGetProfile } from "../hooks/useGetProfile";
import Spinner from "./Spinner";

const Search = () => {
  const searchQuery = useSearchQuery();
  const { isLoadingProfile } = useGetProfile(searchQuery);
  const [githubUsername, setGithubUsername] = useState("");
  const setSearchQuery = useSetSearchQuery();
  const handleGetUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!githubUsername.trim()) return;

    setSearchQuery(githubUsername);
  };

  return (
    <form
      onSubmit={handleGetUser}
      className="w-full max-w-2xl mx-auto mt-4 px-2"
    >
      <div className="flex flex-row gap-2 sm:items-center bg-transparent glass rounded-xl p-2">
        {/* Input wrapper */}
        <div className="relative flex-1">
          <IoSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70" />

          <input
            type="search"
            className="w-full pl-10 pr-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg glass outline-none"
            placeholder="i.e. johndoe"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          disabled={isLoadingProfile}
          type="submit"
          className="max-w-fit sm:w-auto px-4 p-1.5 sm:py-2 text-sm font-medium rounded-lg 
                     bg-linear-to-r from-cyan-900 to-blue-900 
                     hover:scale-95 active:scale-90 transition-all duration-300"
        >
          {isLoadingProfile ? <Spinner /> : "Search"}
        </button>
      </div>
    </form>
  );
};
export default Search;
