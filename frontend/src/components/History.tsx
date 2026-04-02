import {
  useDeleteUserFromHistory,
  useHistory,
  useSetSearchQuery,
} from "../store/store";

const History = () => {

  const history = useHistory();
  const setSearchQuery = useSetSearchQuery();
  const removeFromHistory = useDeleteUserFromHistory();

  console.log(history, 'history')
  return (
    <div className="rounded-md p-4">
      <h2 className="font-bold text-xl mb-4 border-b border-gray-600 pb-2">
        Recent Activity
      </h2>

      <ul className="flex flex-col gap-3">
        {history.map((item, index) => (
          <li
            key={item._id || index}
            onClick={() => setSearchQuery(item.username)}
            className="flex cursor-pointer items-center gap-3 p-2 rounded-lg transition-all glass"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromHistory(item.username);
              }}
              className="size-8 flex mr-4 items-center justify-center rounded-full p-1 border border-gray-500 hover:bg-black/40 transition-colors duration-200 group"
            >
              <span className="text-rose-500 transition-all duration-200 group-hover:scale-120">
                X
              </span>
            </button>

            <img
              src={item.avatarUrl}
              alt={item.username}
              className="w-10 h-10 rounded-full border border-gray-500"
            />

            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm leading-tight">
                {item.name || "No Name Provided"}
              </span>
              <span className="text-xs text-gray-400">@{item.username}</span>
            </div>

            <a
              href={item.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 text-xs font-medium bg-blue-900/30 px-2 py-1 rounded"
            >
              View
            </a>
          </li>
        ))}
      </ul>

      {history.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">
          No recent searches yet.
        </p>
      )}
    </div>
  );
};

export default History;
