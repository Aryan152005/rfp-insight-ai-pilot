
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsDialog } from "@/components/layout/SettingsDialog";

export const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  // Add console log for debugging
  console.log("Navbar rendering");

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile sidebar trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden mr-2">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            
            {/* Logo and name */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-rfp-blue">RFP Analyzer</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className={`py-2 px-3 rounded-md hover:bg-gray-100 transition-colors ${location.pathname === "/" ? "font-medium text-rfp-blue" : "text-gray-700"}`}>
                Home
              </Link>
              <Link to="/analysis" className={`py-2 px-3 rounded-md hover:bg-gray-100 transition-colors ${location.pathname.includes("/analysis") ? "font-medium text-rfp-blue" : "text-gray-700"}`}>
                Analysis
              </Link>
              <Link to="/chat" className={`py-2 px-3 rounded-md hover:bg-gray-100 transition-colors ${location.pathname === "/chat" ? "font-medium text-rfp-blue" : "text-gray-700"}`}>
                Q&A Bot
              </Link>
              <Link to="/report" className={`py-2 px-3 rounded-md hover:bg-gray-100 transition-colors ${location.pathname === "/report" ? "font-medium text-rfp-blue" : "text-gray-700"}`}>
                Report
              </Link>
            </nav>
            
            {/* Settings button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSettings(true)}
              className="relative"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </header>
  );
};

export default Navbar;
