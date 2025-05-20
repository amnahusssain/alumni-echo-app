
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/App";
import { Home, Users, FileText, Calendar, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const { isAuthenticated, selectedCampus, setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const navigationItems = [
    { name: "Home Feed", icon: <Home className="w-5 h-5" />, path: "/home" },
    { name: "Alumni Job Portal", icon: <Users className="w-5 h-5" />, path: "/alumni" },
    { name: "Past Papers", icon: <FileText className="w-5 h-5" />, path: "/papers" },
    { name: "Societies", icon: <Calendar className="w-5 h-5" />, path: "/societies" },
    { name: "Profile", icon: <User className="w-5 h-5" />, path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Top navigation bar */}
      <header className="bg-comsats-blue text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-comsats-blue/80">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-white">
                <div className="bg-comsats-blue text-white p-6">
                  <h2 className="text-xl font-bold">COMSATS University</h2>
                  <p className="text-sm opacity-75">{selectedCampus} Campus</p>
                </div>
                <div className="p-4">
                  <nav className="space-y-1">
                    {navigationItems.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => handleNavigation(item.path)}
                        className={`nav-link ${
                          location.pathname === item.path ? "nav-link-active" : ""
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    ))}
                    <div
                      onClick={handleLogout}
                      className="nav-link text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="container mx-auto px-4 py-6">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center h-16">
        {navigationItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center justify-center ${
              location.pathname === item.path ? "text-comsats-blue" : "text-gray-500"
            }`}
          >
            {item.icon}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
