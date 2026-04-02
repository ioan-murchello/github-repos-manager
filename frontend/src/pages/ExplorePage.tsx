import { useState } from "react";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos.tsx";
import { useGetPopularRepos } from "../hooks/useGetPopularRepos.tsx";
import { LANGUAGES_LIST } from "../utils/constans.ts";

const ExplorePage = () => {
  const [language, setLanguage] = useState<string>("");
  const { popularRepos, isLoadingPopularRepos } = useGetPopularRepos(language);

  return (
    <div className="h-screen flex flex-col gap-4 overflow-y-auto">
      <div className="max-w-3xl h-screen mx-auto rounded-md pt-8 px-2">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <ul className="flex flex-wrap gap-4 mt-4 justify-center">
          {LANGUAGES_LIST.map((lang) => (
            <img
              key={lang.id}
              src={lang.src}
              alt={lang.alt}
              className="h-14 sm:h-20 cursor-pointer hover:scale-110 transition-all duration-200"
              onClick={() => setLanguage(lang.id)}
            />
          ))}
        </ul>

        {popularRepos && popularRepos?.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {language.toUpperCase()}{" "}
            </span>
            Repositories
          </h2>
        )}
        {popularRepos && popularRepos?.length > 0 && (
          <Repos repos={popularRepos} />
        )}
        {isLoadingPopularRepos && <Spinner />}
      </div>
    </div>
  );
};
export default ExplorePage;
