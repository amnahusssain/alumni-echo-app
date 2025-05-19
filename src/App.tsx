
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Pages
import CampusSelection from "./pages/CampusSelection";
import Authentication from "./pages/Authentication";
import NotFound from "./pages/NotFound";
import HomeFeed from "./pages/HomeFeed";
import AlumniPortal from "./pages/AlumniPortal";
import PastPapers from "./pages/PastPapers";
import Societies from "./pages/Societies";
import Profile from "./pages/Profile";

// Contexts
export interface AppContextType {
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userData: {
    name: string;
    email: string;
    bio: string;
    regNumber: string;
    batch: string;
    degree: string;
    skills: string[];
    interests: string[];
    avatar: string;
    cv: string;
  };
  setUserData: (data: any) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const queryClient = new QueryClient();

const App = () => {
  // Global state
  const [selectedCampus, setSelectedCampus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    name: "Student Name",
    email: "",
    bio: "Computer Science student at COMSATS University",
    regNumber: "SP20-BCS-000",
    batch: "2020-2024",
    degree: "BS Computer Science",
    skills: ["React", "JavaScript", "UI/UX Design"],
    interests: ["Mobile Development", "Web Design", "AI"],
    avatar: "",
    cv: "",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContext.Provider
          value={{
            selectedCampus,
            setSelectedCampus,
            isAuthenticated,
            setIsAuthenticated,
            userData,
            setUserData,
          }}
        >
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CampusSelection />} />
              <Route path="/campus-selection" element={<CampusSelection />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/home" element={<HomeFeed />} />
              <Route path="/alumni" element={<AlumniPortal />} />
              <Route path="/papers" element={<PastPapers />} />
              <Route path="/societies" element={<Societies />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
