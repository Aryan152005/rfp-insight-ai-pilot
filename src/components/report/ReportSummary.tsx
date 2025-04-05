
import { useState } from "react";
import { 
  FileText, Download, ChevronDown, CheckCircle, XCircle, AlertTriangle, AlertCircle, 
  Printer, Clock, FileCheck, FileMinus, FilePlus, Share2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

export const ReportSummary = () => {
  const { toast } = useToast();
  const [exportLoading, setExportLoading] = useState(false);
  
  // Mock data for the report
  const reportData = {
    rfpTitle: "IT Modernization and Cloud Migration Services",
    agency: "Department of Technology",
    dueDate: "May 15, 2025",
    eligibilityScore: 85,
    riskScore: 25,
    completionScore: 68,
    eligibilityStats: {
      met: 8,
      partial: 1,
      gaps: 2,
    },
    riskStats: {
      high: 1,
      medium: 3,
      low: 1,
    },
    checklistStats: {
      completed: 6,
      pending: 12,
    },
    keyTakeaways: [
      "Strong technical match with RFP requirements (85% eligibility score)",
      "Low overall risk profile (25% risk score) with one high-risk provision to address",
      "Submission preparation is 33% complete with 12 required documents pending",
      "Need to increase liability insurance coverage from $3M to $5M",
      "Technical Architect requirement needs attention (8 years vs. required 10+ years)",
      "Compliance matrix and work breakdown structure should be prioritized"
    ]
  };

  const handleExport = (format: string) => {
    setExportLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Report Exported",
        description: `Your report has been exported as ${format.toUpperCase()}.`,
      });
      setExportLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Report Header */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50 border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div>
              <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-800">
                RFP Analysis Report
              </Badge>
              <CardTitle className="text-2xl font-bold">{reportData.rfpTitle}</CardTitle>
              <p className="text-gray-500 mt-1">{reportData.agency} • Due {reportData.dueDate}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => handleExport('pdf')} disabled={exportLoading}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={() => handleExport('markdown')} disabled={exportLoading}>
                <FileText className="mr-2 h-4 w-4" />
                Export Markdown
              </Button>
              <Button variant="outline" disabled={exportLoading}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Eligibility Score */}
            <div className="text-center p-4 border rounded-lg bg-gradient-to-b from-green-50 to-white">
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-white border-4 border-green-100 mb-4">
                <span className="text-2xl font-bold text-green-600">{reportData.eligibilityScore}%</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Eligibility Score</h3>
              <div className="flex justify-center mt-2 space-x-3 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                  <span>{reportData.eligibilityStats.met} Met</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>{reportData.eligibilityStats.partial} Partial</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                  <span>{reportData.eligibilityStats.gaps} Gaps</span>
                </div>
              </div>
            </div>
            
            {/* Risk Score */}
            <div className="text-center p-4 border rounded-lg bg-gradient-to-b from-blue-50 to-white">
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-white border-4 border-blue-100 mb-4">
                <span className="text-2xl font-bold text-blue-600">{reportData.riskScore}%</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Risk Score</h3>
              <div className="flex justify-center mt-2 space-x-3 text-sm">
                <div className="flex items-center">
                  <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                  <span>{reportData.riskStats.high} High</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>{reportData.riskStats.medium} Medium</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                  <span>{reportData.riskStats.low} Low</span>
                </div>
              </div>
            </div>
            
            {/* Checklist Status */}
            <div className="text-center p-4 border rounded-lg bg-gradient-to-b from-purple-50 to-white">
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-white border-4 border-purple-100 mb-4">
                <span className="text-2xl font-bold text-purple-600">{reportData.completionScore}%</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Completion Score</h3>
              <div className="flex justify-center mt-2 space-x-3 text-sm">
                <div className="flex items-center">
                  <FileCheck className="h-3 w-3 text-green-500 mr-1" />
                  <span>{reportData.checklistStats.completed} Complete</span>
                </div>
                <div className="flex items-center">
                  <FileMinus className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>{reportData.checklistStats.pending} Pending</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Our analysis of the IT Modernization and Cloud Migration Services RFP indicates a <strong>strong potential fit</strong> for your organization based on technical capabilities and past performance. The evaluation shows an overall eligibility score of 85%, suggesting good alignment with the requirements.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            The risk assessment identified a generally favorable risk profile (25%), with one high-risk provision related to unlimited liability that should be addressed through negotiation. Several medium-risk items require attention but can be mitigated with appropriate strategies.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            Proposal preparation is currently at 68% completion, with 12 required documents still pending. The most critical gaps to address are the compliance matrix, work breakdown structure, and project schedule. Based on the current timeline, there are 42 days remaining until submission, which should provide adequate time to complete all requirements if given appropriate priority.
          </p>
        </CardContent>
      </Card>
      
      {/* Key Takeaways */}
      <Card className="bg-gradient-to-r from-blue-50 to-transparent">
        <CardHeader>
          <CardTitle className="text-xl">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {reportData.keyTakeaways.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-white p-1 rounded-full border border-gray-200 mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-rfp-blue" />
                </div>
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Detailed Sections */}
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="eligibility" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <span className="font-semibold">Eligibility Assessment</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="space-y-4">
              <p className="text-gray-700">
                Your organization meets 8 out of 11 required criteria fully, with 1 partial match and 2 gaps. The primary areas requiring attention are:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                  <span>
                    <strong>Government contract experience:</strong> RFP requires 3+ federal contracts in past 5 years; company has 2 federal contracts.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                  <span>
                    <strong>Technical Architect experience:</strong> RFP requires 10+ years; available architect has 8 years experience.
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                  <span>
                    <strong>Insurance coverage:</strong> RFP requires $5M liability insurance; company has $3M coverage.
                  </span>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FilePlus className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                    <span>Partner with a company having additional federal contract experience to strengthen this area.</span>
                  </li>
                  <li className="flex items-start">
                    <FilePlus className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                    <span>Assign a more senior technical architect for this project or highlight additional qualifications of current architect.</span>
                  </li>
                  <li className="flex items-start">
                    <FilePlus className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                    <span>Contact insurance provider to increase liability coverage before submission.</span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="risk" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100">
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Risk Assessment</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="space-y-4">
              <p className="text-gray-700">
                Overall risk profile is favorable (25%), with 1 high-risk provision, 3 medium-risk provisions, and 1 low-risk provision identified.
              </p>
              
              <div className="border rounded-md p-4 bg-red-50 border-red-200">
                <h4 className="font-medium text-red-800">High Risk: Unlimited Liability Clause</h4>
                <p className="mt-1 text-gray-700">Section 8.3.2 imposes unlimited liability for data breaches without proportional responsibility limits, which could expose the company to significant financial risk.</p>
                <p className="mt-2 text-red-800 font-medium">Recommendation:</p>
                <p className="text-gray-700">Propose alternative language that limits liability to direct damages and caps liability based on contract value.</p>
              </div>
              
              <div className="border rounded-md p-4 bg-yellow-50 border-yellow-200">
                <h4 className="font-medium text-yellow-800">Medium Risk: Payment Terms</h4>
                <p className="mt-1 text-gray-700">Section 5.1.4 requires completion of all deliverables before any payment is made, creating potential cash flow challenges.</p>
                <p className="mt-2 text-yellow-800 font-medium">Recommendation:</p>
                <p className="text-gray-700">Request milestone-based payments aligned with defined deliverables.</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Risk Analysis
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="checklist" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-purple-500" />
              <span className="font-semibold">Submission Checklist</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div className="space-y-4">
              <p className="text-gray-700">
                Proposal preparation is at 68% completion with 6 out of 18 required documents completed. Based on the current timeline, there are 42 days remaining until submission.
              </p>
              
              <div>
                <h4 className="font-medium mb-2">Priority Items (Next 7 Days):</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span><strong>Compliance Matrix</strong> - Point-by-point compliance with all RFP requirements</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span><strong>Work Breakdown Structure</strong> - Detailed WBS showing all phases and deliverables</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <span><strong>Project Schedule</strong> - Gantt chart showing timeline and dependencies</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline">
                  <FileCheck className="mr-2 h-4 w-4" />
                  View Full Checklist
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Actions Footer */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
        <h3 className="text-xl font-semibold">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button className="justify-start h-auto py-3 bg-rfp-blue hover:bg-rfp-blue/90">
            <FileCheck className="mr-2 h-5 w-5" />
            <span className="text-left">Complete Priority Documents</span>
          </Button>
          <Button className="justify-start h-auto py-3 bg-rfp-blue hover:bg-rfp-blue/90">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span className="text-left">Address High-Risk Provisions</span>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-3">
            <Share2 className="mr-2 h-5 w-5" />
            <span className="text-left">Share Report with Team</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
