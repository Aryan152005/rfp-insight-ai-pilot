
import { Calendar, Clock, Building, FileText, Users, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const OverviewTab = () => {
  // Mock data for the overview
  const rfpData = {
    title: "IT Modernization and Cloud Migration Services",
    agency: "Department of Technology",
    dueDate: "May 15, 2025",
    timeLeft: "42 days",
    estimatedValue: "$2.5M - $3.2M",
    status: "Open",
    eligibilityScore: 85,
    riskScore: 25,
    completionScore: 68,
    sections: [
      { name: "Introduction", pages: "1-5" },
      { name: "Scope of Work", pages: "6-12" },
      { name: "Technical Requirements", pages: "13-22" },
      { name: "Evaluation Criteria", pages: "23-27" },
      { name: "Pricing Structure", pages: "28-32" },
      { name: "Terms & Conditions", pages: "33-40" }
    ]
  };
  
  console.log("Rendering OverviewTab");

  return (
    <div className="space-y-8">
      {/* RFP Header Information */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{rfpData.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="flex items-start">
            <div className="bg-gray-100 p-2 rounded-full">
              <Building className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Issuing Agency</p>
              <p className="font-medium text-gray-900">{rfpData.agency}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium text-gray-900">{rfpData.dueDate}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Time Remaining</p>
              <p className="font-medium text-gray-900">{rfpData.timeLeft}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray-100 p-2 rounded-full">
              <Coins className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Estimated Value</p>
              <p className="font-medium text-gray-900">{rfpData.estimatedValue}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-rfp-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Eligibility Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{rfpData.eligibilityScore}%</p>
              <Progress value={rfpData.eligibilityScore} className="h-2 w-2/3" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {rfpData.eligibilityScore > 75 ? "Strong match with requirements" : "Some gaps in requirements match"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-rfp-red">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{rfpData.riskScore}%</p>
              <Progress value={rfpData.riskScore} className="h-2 w-2/3" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {rfpData.riskScore < 30 ? "Low risk profile identified" : "Moderate risk factors present"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-rfp-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completion Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{rfpData.completionScore}%</p>
              <Progress value={rfpData.completionScore} className="h-2 w-2/3" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {rfpData.completionScore > 60 ? "On track for submission" : "Additional documents needed"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Document Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">RFP Document Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rfpData.sections.map((section, index) => (
              <div 
                key={index} 
                className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
              >
                <FileText className="h-5 w-5 text-gray-500" />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{section.name}</p>
                  <p className="text-xs text-gray-500">Pages {section.pages}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Key Personnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Required Key Personnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { role: "Project Manager", qualification: "PMP Certified, 5+ years experience" },
              { role: "Technical Architect", qualification: "Cloud certifications, 3+ years experience" },
              { role: "Security Specialist", qualification: "CISSP or equivalent, 4+ years experience" },
              { role: "Senior Developer", qualification: "Full-stack, 5+ years experience" },
            ].map((person, index) => (
              <div 
                key={index} 
                className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-100"
              >
                <Users className="h-5 w-5 text-gray-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium">{person.role}</p>
                  <p className="text-xs text-gray-500">{person.qualification}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
