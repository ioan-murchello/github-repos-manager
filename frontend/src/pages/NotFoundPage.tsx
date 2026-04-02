import { Link } from "react-router-dom";
import { FaGithub, FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 pt-6">
      <div className="relative">
        <FaGithub className="text-7xl sm:text-9xl animate-pulse" />
        <FaExclamationTriangle className="absolute bottom-0 right-0 text-2xl sm:text-4xl  text-yellow-500" />
      </div>

      <h1 className="text-3xl sm:text-6xl font-bold mt-6 text-white">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-400 mt-2">
        Oops! This repository of reality doesn't exist.
      </h2>

      <p className="text-gray-500 mt-4 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable. Just like a deleted branch.
      </p>

      <Link
        to="/"
        className="mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg 
                   transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-900/20 text-sm sm:text-base"
      >
        <FaGithub />
        Back to Dashboard
      </Link>

      <div className="mt-12 p-4 bg-slate-900/50 rounded border border-slate-800 font-mono text-xs text-blue-400">
        <p>$ git checkout main</p>
        <p className="text-red-400">
          error: pathspec 'page' did not match any file(s) known to git
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
