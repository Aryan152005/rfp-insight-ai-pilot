
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const EligibilityTab = () => {
  // Mock data for eligibility comparison
  const eligibilityData = {
    overallScore: 85,
    categories: [
      { name: "Technical Capabilities", score: 92 },
      { name: "Past Performance", score: 78 },
      { name: "Certifications", score: 95 },
      { name: "Team Composition", score: 83 },
      { name: "Financial Requirements", score: 76 },
    ],
    requirements: [
      { 
        category: "Technical Capabilities",
        requirement: "Cloud migration experience",
        rfpRequirement: "5+ cloud migration projects",
        companyCapability: "7 completed cloud migration projects",
        match: true,
      },
      { 
        category: "Technical Capabilities",
        requirement: "Agile development methodology",
        rfpRequirement: "Certified Scrum team members",
        companyCapability: "4 Certified Scrum Masters, Agile team structure",
        match: true,
      },
      { 
        category: "Past Performance",
        requirement: "Government contract experience",
        rfpRequirement: "3+ federal contracts in past 5 years",
        companyCapability: "2 federal contracts, 5 state contracts",
        match: false,
      },
      { 
        category: "Past Performance",
        requirement: "Similar project size",
        rfpRequirement: "$2M+ project implementation",
        companyCapability: "$3.5M average project size",
        match: true,
      },
      { 
        category: "Certifications",
        requirement: "ISO 27001",
        rfpRequirement: "Current certification required",
        companyCapability: "ISO 27001:2022 certified",
        match: true,
      },
      { 
        category: "Certifications",
        requirement: "CMMI Level",
        rfpRequirement: "CMMI Level 3 or higher",
        companyCapability: "CMMI Level 4 certified",
        match: true,
      },
      { 
        category: "Team Composition",
        requirement: "Security specialist",
        rfpRequirement: "CISSP certified security lead",
        companyCapability: "CISSP certified security architect on staff",
        match: true,
      },
      { 
        category: "Team Composition",
        requirement: "Technical Architect",
        rfpRequirement: "10+ years experience",
        companyCapability: "Available technical architect has 8 years experience",
        match: false,
        partialMatch: true,
      },
      { 
        category: "Financial Requirements",
        requirement: "Revenue threshold",
        rfpRequirement: "$10M annual revenue minimum",
        companyCapability: "$12.5M annual revenue",
        match: true,
      },
      { 
        category: "Financial Requirements",
        requirement: "Insurance coverage",
        rfpRequirement: "$5M liability insurance",
        companyCapability: "$3M liability insurance",
        match: false,
      },
    ]
  };

  // Calculate statistics
  const matches = eligibilityData.requirements.filter(r => r.match).length;
  const partialMatches = eligibilityData.requirements.filter(r => !r.match && r.partialMatch).length;
  const nonMatches = eligibilityData.requirements.filter(r => !r.match && !r.partialMatch).length;
  const totalRequirements = eligibilityData.requirements.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overall Eligibility Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Eligibility Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-4xl font-bold text-gray-900">{eligibilityData.overallScore}%</p>
              <p className="text-gray-500 mt-1">Overall Match Score</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" /> {matches} Requirements Met
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  <AlertCircle className="h-3 w-3 mr-1" /> {partialMatches} Partial Matches
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                  <XCircle className="h-3 w-3 mr-1" /> {nonMatches} Gaps Identified
                </Badge>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                {eligibilityData.categories.map((category, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{category.name}</span>
                      <span className="font-medium">{category.score}%</span>
                    </div>
                    <Progress 
                      value={category.score} 
                      className="h-2" 
                      indicatorClassName={
                        category.score >= 90 ? "bg-green-500" :
                        category.score >= 70 ? "bg-yellow-500" : 
                        "bg-red-500"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Requirements Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requirements Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Requirement</th>
                  <th className="px-4 py-3 text-left font-medium">RFP Requirement</th>
                  <th className="px-4 py-3 text-left font-medium">Company Capability</th>
                  <th className="px-4 py-3 text-center font-medium">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {eligibilityData.requirements.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4 text-gray-900 font-medium">{item.category}</td>
                    <td className="px-4 py-4 text-gray-900">{item.requirement}</td>
                    <td className="px-4 py-4 text-gray-700">{item.rfpRequirement}</td>
                    <td className="px-4 py-4 text-gray-700">{item.companyCapability}</td>
                    <td className="px-4 py-4 text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {item.match ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : item.partialMatch ? (
                              <AlertCircle className="h-5 w-5 text-yellow-500 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.match 
                              ? "Requirement fully met" 
                              : item.partialMatch 
                              ? "Partial match - may need improvement" 
                              : "Requirement not met - action needed"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendations to Improve Eligibility</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
              <p className="font-medium text-gray-900">Secure additional government contracts reference</p>
              <p className="text-gray-700 mt-1">Consider partnering with a firm that has more federal contract experience to strengthen this requirement.</p>
            </li>
            <li className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
              <p className="font-medium text-gray-900">Assign technical architect with more experience</p>
              <p className="text-gray-700 mt-1">Consider bringing in a more senior technical architect for this project to meet the 10+ years experience requirement.</p>
            </li>
            <li className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
              <p className="font-medium text-gray-900">Increase liability insurance coverage</p>
              <p className="text-gray-700 mt-1">Current coverage is $3M, but RFP requires $5M. Contact your insurance provider to upgrade coverage before submission.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EligibilityTab;
