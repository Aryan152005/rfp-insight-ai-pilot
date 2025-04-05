
import { Check, Clipboard, AlertCircle, FileText, FileArchive, FileCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Checklist item type
type ChecklistItem = {
  id: string;
  section: string;
  name: string;
  description: string;
  required: boolean;
  completed: boolean;
  dueDate?: string;
};

export const ChecklistTab = () => {
  const { toast } = useToast();
  // Mock data for the checklist
  const initialChecklist: ChecklistItem[] = [
    {
      id: "DOC-001",
      section: "Administrative",
      name: "Cover Letter",
      description: "Include company letterhead, contact information, and brief statement of interest",
      required: true,
      completed: true,
    },
    {
      id: "DOC-002",
      section: "Administrative",
      name: "Executive Summary",
      description: "2-3 page overview of your proposal and key differentiators",
      required: true,
      completed: true,
    },
    {
      id: "DOC-003",
      section: "Administrative",
      name: "Table of Contents",
      description: "Including section numbers and page references",
      required: true,
      completed: false,
    },
    {
      id: "DOC-004",
      section: "Technical",
      name: "Technical Approach",
      description: "Detailed methodology for cloud migration and modernization",
      required: true,
      completed: true,
    },
    {
      id: "DOC-005",
      section: "Technical",
      name: "Work Breakdown Structure",
      description: "Detailed WBS showing all phases and deliverables",
      required: true,
      completed: false,
    },
    {
      id: "DOC-006",
      section: "Technical",
      name: "Project Schedule",
      description: "Gantt chart showing timeline and dependencies",
      required: true,
      completed: false,
    },
    {
      id: "DOC-007",
      section: "Technical",
      name: "Technical Diagrams",
      description: "Architecture diagrams for the proposed solution",
      required: true,
      completed: false,
    },
    {
      id: "DOC-008",
      section: "Management",
      name: "Project Management Plan",
      description: "Approach to managing the project, including communication plans",
      required: true,
      completed: false,
    },
    {
      id: "DOC-009",
      section: "Management",
      name: "Staffing Plan",
      description: "Key personnel, roles, and availability",
      required: true,
      completed: false,
    },
    {
      id: "DOC-010",
      section: "Management",
      name: "Risk Management Plan",
      description: "Identification of risks and mitigation strategies",
      required: true,
      completed: false,
    },
    {
      id: "DOC-011",
      section: "Past Performance",
      name: "Case Studies",
      description: "3-5 case studies demonstrating similar work",
      required: true,
      completed: false,
    },
    {
      id: "DOC-012",
      section: "Past Performance",
      name: "Reference Letters",
      description: "Reference letters from previous clients",
      required: false,
      completed: false,
    },
    {
      id: "DOC-013",
      section: "Financial",
      name: "Price Proposal",
      description: "Detailed cost breakdown as per RFP requirements",
      required: true,
      completed: false,
    },
    {
      id: "DOC-014",
      section: "Financial",
      name: "Financial Statements",
      description: "Last 3 years of audited financial statements",
      required: true,
      completed: false,
    },
    {
      id: "DOC-015",
      section: "Compliance",
      name: "Certifications",
      description: "Copies of all required certifications",
      required: true,
      completed: true,
    },
    {
      id: "DOC-016",
      section: "Compliance",
      name: "Compliance Matrix",
      description: "Point-by-point compliance with all RFP requirements",
      required: true,
      completed: false,
    },
    {
      id: "DOC-017",
      section: "Appendices",
      name: "Team Resumes",
      description: "CVs of all key team members",
      required: true,
      completed: true,
    },
    {
      id: "DOC-018",
      section: "Appendices",
      name: "Supporting Documents",
      description: "Any additional materials referenced in the proposal",
      required: false,
      completed: false,
    },
  ];

  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // Handle checkbox toggle
  const handleToggleItem = (itemId: string) => {
    setChecklist(checklist.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));

    const item = checklist.find(item => item.id === itemId);
    if (item) {
      toast({
        title: item.completed ? "Item marked as incomplete" : "Item marked as complete",
        description: item.name,
      });
    }
  };

  // Filter items based on selected filter
  const filteredItems = checklist.filter(item => {
    if (filter === "all") return true;
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  // Group items by section
  const sections = Array.from(new Set(checklist.map(item => item.section)));
  
  // Calculate completion statistics
  const totalItems = checklist.length;
  const completedItems = checklist.filter(item => item.completed).length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const requiredCompletedItems = checklist.filter(item => item.required && item.completed).length;
  const totalRequiredItems = checklist.filter(item => item.required).length;
  const requiredCompletionPercentage = totalRequiredItems > 0 
    ? Math.round((requiredCompletedItems / totalRequiredItems) * 100) 
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Completion Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Submission Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Overall Completion</span>
              <span className="text-sm font-medium">{completedItems} of {totalItems} ({completionPercentage}%)</span>
            </div>
            <Progress value={completionPercentage} className="h-2 mb-4" />
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Required Items</span>
              <span className="text-sm font-medium">{requiredCompletedItems} of {totalRequiredItems} ({requiredCompletionPercentage}%)</span>
            </div>
            <Progress value={requiredCompletionPercentage} className="h-2" indicatorClassName="bg-rfp-red" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Document Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm">Total Documents</span>
                </div>
                <Badge variant="outline" className="bg-gray-100">
                  {totalItems}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Completed</span>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {completedItems}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm">Pending</span>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {totalItems - completedItems}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileArchive className="h-5 w-5 text-rfp-red mr-2" />
                  <span className="text-sm">Required Pending</span>
                </div>
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  {totalRequiredItems - requiredCompletedItems}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full flex items-center justify-center" variant="outline">
              <Clipboard className="mr-2 h-4 w-4" />
              Export Checklist
            </Button>
            
            <Button className="w-full flex items-center justify-center" variant="outline">
              <FileCog className="mr-2 h-4 w-4" />
              Generate Missing Documents
            </Button>
            
            <Button className="w-full bg-rfp-blue hover:bg-rfp-blue/90 text-white">
              View RFP Requirements
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-rfp-blue hover:bg-rfp-blue/90" : ""}
        >
          All Items
        </Button>
        <Button 
          variant={filter === "completed" ? "default" : "outline"} 
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Completed
        </Button>
        <Button 
          variant={filter === "pending" ? "default" : "outline"} 
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
        >
          Pending
        </Button>
      </div>
      
      {/* Checklist Items */}
      <div className="space-y-6">
        {sections.map((section) => {
          const sectionItems = filteredItems.filter(item => item.section === section);
          if (sectionItems.length === 0) return null;
          
          return (
            <Card key={section}>
              <CardHeader>
                <CardTitle className="text-lg">{section} Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {sectionItems.map((item) => (
                    <li 
                      key={item.id}
                      className={`flex items-start p-3 rounded-md border ${
                        item.completed 
                          ? 'bg-green-50 border-green-200' 
                          : item.required 
                          ? 'bg-yellow-50 border-yellow-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <Checkbox 
                        id={item.id} 
                        checked={item.completed}
                        onCheckedChange={() => handleToggleItem(item.id)}
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <label 
                          htmlFor={item.id} 
                          className={`font-medium cursor-pointer ${
                            item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {item.name}
                          {item.required && (
                            <Badge variant="outline" className="ml-2 bg-red-50 text-red-800 border-red-200">
                              Required
                            </Badge>
                          )}
                        </label>
                        <p className={`text-sm ${item.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>ID: {item.id}</span>
                          {item.dueDate && (
                            <span className="ml-3">Due: {item.dueDate}</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistTab;
