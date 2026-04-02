import { FaHeart } from "react-icons/fa";
import { LuLink } from "react-icons/lu";
import { CiSquareRemove } from "react-icons/ci";
import { useGetLikesProfile } from "../hooks/useGetLikesProfile";

import Spinner from "../components/Spinner";
import { formatDate } from "../utils/functions";
import Tooltip from "../components/Tooltip";
import type { IGithubUserHistoryItem } from "../types/types";
import { useUnlikeProfile } from "../hooks/useUnlikeProfile";

const LikesPage = () => {
  const { likedProfiles, isLoading } = useGetLikesProfile();
  const unlikeProfile = useUnlikeProfile();

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-10">
      {/* 1. desktop version*/}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left bg-glass rounded-lg">
          <thead className="text-xs uppercase bg-black/20">
            <tr>
              <th className="p-2">No</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">GitHub</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {likedProfiles?.map((user: IGithubUserHistoryItem, idx: number) => (
              <tr key={user._id || idx} className="border-b border-gray-800">
                <td className="p-4 w-4 text-gray-400">{idx + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full border border-gray-700"
                    src={
                      user.avatarUrl || "https://github.com/identicons/jedi.png"
                    }
                    alt={user.username}
                  />
                  <span className="text-md flex items-center gap-3 font-semibold">
                    {user.username}
                    <Tooltip copyValue={user.username} />
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 glass text-xs"
                  >
                    <LuLink size={14} /> View Profile
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {user.likedDate ? formatDate(user.likedDate) : "Recently"}
                </td>
                <td className="px-6 py-4 text-center">
                  <FaHeart size={18} className="text-red-500 inline" />
                </td>
                {/* delete item */}
                <td className="px-6 py-4 text-center">
                  <CiSquareRemove
                    onClick={() => unlikeProfile(user.username)}
                    className="size-6 text-red-300 inline hover:text-red-600 cursor-pointer hover:scale-110 transition-all duration-200"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2.mobile version */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {likedProfiles?.map((user: IGithubUserHistoryItem, idx: number) => (
          <div
            key={user._id || idx}
            className="glass p-4 max-w-125 w-full mx-auto rounded-xl border border-gray-800 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full border border-gray-700"
                  src={
                    user.avatarUrl || "https://github.com/identicons/jedi.png"
                  }
                  alt={user.username}
                />
                <div>
                  <p className="font-bold text-md">{user.username}</p>
                  <p className="text-xs text-gray-400">
                    {user.likedDate ? formatDate(user.likedDate) : "Recently"}
                  </p>
                </div>
                <Tooltip copyValue={user.username} />
              </div>
              <div className="flex items-center justify-center gap-5">
                <FaHeart size={20} className="text-red-500" />
                <CiSquareRemove
                  onClick={() => unlikeProfile(user.username)}
                  className="size-6 text-red-300 inline   cursor-pointer transition-all duration-200"
                />
              </div>
            </div>

            <a
              href={`https://github.com/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit md:w-full glass cursor-pointer flex justify-center items-center gap-2 py-1 px-3 rounded-lg font-medium transition-colors text-sm"
            >
              <LuLink size={16} />
              View GitHub Profile
            </a>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {likedProfiles?.length === 0 && (
        <div className="text-center py-20 bg-glass rounded-lg mt-4 border border-gray-800">
          <p className="text-gray-400 text-lg">
            No one has liked your profile yet 🥲
          </p>
        </div>
      )}
    </div>
  );
};

export default LikesPage;
