import { MdLogout } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { user } = useAuth();
  const logout = useLogout();

  return (
    <>
      <img
        src={user.avatarUrl || "/logo.png"}
        className="w-10 h-10 rounded-full border border-gray-800"
      />

      <div
        className="cursor-pointer p-2 flex items-center rounded-lg glass mt-auto border border-gray-800"
        onClick={() => logout()}
      >
        <MdLogout size={22} />
      </div>
    </>
  );
};

export default Logout;
