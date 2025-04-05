
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReportSummary } from "@/components/report/ReportSummary";

const Report = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />
      <Sidebar />
      
      <div className="ml-0 md:ml-64 pt-16">
        <div className="container py-8 px-4 md:px-8">
          <ReportSummary />
        </div>
      </div>
    </div>
  );
};

export default Report;
