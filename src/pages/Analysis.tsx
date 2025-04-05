
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import TabNavigation from "@/components/ui/TabNavigation";
import OverviewTab from "@/components/analysis/OverviewTab";
import EligibilityTab from "@/components/analysis/EligibilityTab";
import RiskAnalysisTab from "@/components/analysis/RiskAnalysisTab";
import ChecklistTab from "@/components/analysis/ChecklistTab";
import QATab from "@/components/analysis/QATab";

const Analysis = () => {
  const location = useLocation();
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
  
  const renderTabContent = () => {
    switch(activeTab) {
      case "overview":
        return <OverviewTab />;
      case "eligibility":
        return <EligibilityTab />;
      case "risk":
        return <RiskAnalysisTab />;
      case "checklist":
        return <ChecklistTab />;
      case "qa":
        return <QATab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 ml-0 md:ml-64 pt-16 pb-8">
          <div className="container py-8 px-4 md:px-8">
            <div className="mb-6">
              <TabNavigation />
            </div>
            
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
