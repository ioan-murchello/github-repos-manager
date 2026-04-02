import { FaHeart } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useLikeProfile } from "../hooks/useLikeProfile";

const LikeProfile = ({ username }: { username: string }) => {
  const { user } = useAuth();

  const { likeProfile } = useLikeProfile();

  if (!username) return null;

  const isOwnProfile = user?.username === username;

  if (!user || isOwnProfile) return null;

  return (
    <button
      className="p-2 cursor-pointer text-xs w-full font-medium rounded-md bg-glass border border-blue-400 transition-colors duration-150 hover:bg-purple-400 flex items-center gap-2"
      onClick={() => likeProfile(username)}
    >
      <FaHeart className="size-4" /> Like Profile
    </button>
  );
};
export default LikeProfile;
