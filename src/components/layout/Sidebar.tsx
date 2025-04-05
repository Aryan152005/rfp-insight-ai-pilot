
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, CheckCircle, AlertTriangle, CheckSquare, MessagesSquare, FileSpreadsheet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type SidebarItemType = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const sidebarItems: SidebarItemType[] = [
  {
    name: "Overview",
    path: "/analysis",
    icon: LayoutDashboard,
  },
  {
    name: "Eligibility",
    path: "/analysis/eligibility",
    icon: CheckCircle,
  },
  {
    name: "Risk Analysis",
    path: "/analysis/risk",
    icon: AlertTriangle,
  },
  {
    name: "Checklist",
    path: "/analysis/checklist",
    icon: CheckSquare,
  },
  {
    name: "Q&A",
    path: "/analysis/qa",
    icon: MessagesSquare,
  },
  {
    name: "Report",
    path: "/report",
    icon: FileSpreadsheet,
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Add console log for debugging
  console.log("Sidebar rendering, current path:", location.pathname);

  return (
    <div
      className={cn(
        "bg-sidebar fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6">
          <div className="space-y-1 px-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start mb-1",
                      collapsed ? "px-2" : "px-3",
                      isActive 
                        ? "bg-rfp-blue/10 text-rfp-blue hover:bg-rfp-blue/20" 
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-rfp-blue" : "text-gray-500")} />
                    {!collapsed && (
                      <span className="ml-3 text-sm font-medium">{item.name}</span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="w-full flex justify-center text-gray-500 hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
