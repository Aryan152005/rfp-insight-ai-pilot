
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, CheckCircle, AlertTriangle, CheckSquare, MessagesSquare } from "lucide-react";

export const TabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Extract the tab from the URL path
    const path = location.pathname.split("/").pop();
    
    if (path === "analysis") {
      setActiveTab("overview");
    } else if (path) {
      setActiveTab(path);
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "overview") {
      navigate("/analysis");
    } else {
      navigate(`/analysis/${value}`);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview" className="flex items-center">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="eligibility" className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Eligibility</span>
        </TabsTrigger>
        <TabsTrigger value="risk" className="flex items-center">
          <AlertTriangle className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Risk Analysis</span>
        </TabsTrigger>
        <TabsTrigger value="checklist" className="flex items-center">
          <CheckSquare className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Checklist</span>
        </TabsTrigger>
        <TabsTrigger value="qa" className="flex items-center">
          <MessagesSquare className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Q&A</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;
