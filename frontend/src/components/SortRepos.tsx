import type { RepoSortType } from "../types/types";

interface SortReposProps {
  sortType: RepoSortType;
  setSortType: React.Dispatch<React.SetStateAction<RepoSortType>>;
}

const SortRepos = ({ setSortType, sortType }: SortReposProps) => {
 const BUTTONS = [
    { type: "stars" as RepoSortType, text: "Stars" },
    { type: "recent" as RepoSortType, text: "Recent" },
    { type: "forks" as RepoSortType, text: "Forks" },
  ];
 
  return (
    <div className="mb-3 flex w-full flex-wrap justify-end gap-2">
      {BUTTONS.map((button) => (
        <button
          key={button.type}
          type="button"
          onClick={() => setSortType(button.type)}
          className={`
        px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200
        whitespace-nowrap
        ${
          button.type === sortType
            ? "border border-blue-500 bg-blue-500/10"
            : "bg-slate-50/10 hover:bg-slate-50/20"
        }
      `}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};
export default SortRepos;
