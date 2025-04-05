
import { Link } from "react-router-dom";
import { FileText, Database, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  console.log("Navbar rendering");

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 left-0 right-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-rfp-blue" />
              <span className="ml-2 text-xl font-bold text-gray-800">RFP Insight AI</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-rfp-blue px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/analysis" className="text-gray-600 hover:text-rfp-blue px-3 py-2 text-sm font-medium">
              Analysis
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-rfp-blue px-3 py-2 text-sm font-medium">
              Chat
            </Link>
            <Link to="/report" className="text-gray-600 hover:text-rfp-blue px-3 py-2 text-sm font-medium">
              Report
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <Button variant="ghost" className="mr-2" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline">
              <Database className="mr-2 h-4 w-4" /> 
              Company Profile
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-100">
            <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/analysis" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
              Analysis
            </Link>
            <Link to="/chat" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
              Chat
            </Link>
            <Link to="/report" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
              Report
            </Link>
            <div className="mt-3 px-4 py-2">
              <Button variant="outline" className="w-full">
                <Database className="mr-2 h-4 w-4" /> 
                Company Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
