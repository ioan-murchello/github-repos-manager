import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import Sidebar from "./components/Sidebar.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";
import LikesPage from "./pages/LikesPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth.tsx";
import Spinner from "./components/Spinner.tsx";
// import { useAuth } from "./store/authStore.ts";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="relative flex flex-col md:flex-row min-h-dvh bg-slate-800 overflow-hidden">
      <Toaster position="top-right" />
      <div className="absolute size-50 lg:size-72 bg-blue-500/30 rounded-full blur-3xl top-10 left-10 -z-10 md:z-0"></div>
      <div className="absolute size-50 lg:size-72 bg-purple-500/30 rounded-full blur-3xl bottom-10 right-10 -z-10 md:z-0"></div>
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto text-white">
        <Sidebar />
        <section className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/explore"
              element={user ? <ExplorePage /> : <LoginPage />}
            />
            <Route
              path="/likes"
              element={user ? <LikesPage /> : <LoginPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </div>
    </main>
  );
}

export default App;
