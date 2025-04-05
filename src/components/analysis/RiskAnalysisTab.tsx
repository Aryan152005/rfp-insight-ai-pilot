import { AlertTriangle, Shield, Scale, DollarSign, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const RiskAnalysisTab = () => {
  // Mock data for risk analysis
  const riskData = {
    overallRisk: 25,
    riskCategories: [
      { name: "Legal", score: 35, color: "#ef4444" },
      { name: "Financial", score: 22, color: "#f59e0b" },
      { name: "Technical", score: 18, color: "#8b5cf6" },
      { name: "Timeline", score: 30, color: "#0ea5e9" },
      { name: "Compliance", score: 20, color: "#14b8a6" }
    ],
    riskTrend: [
      { day: 1, risk: 45 },
      { day: 2, risk: 42 },
      { day: 3, risk: 40 },
      { day: 4, risk: 35 },
      { day: 5, risk: 32 },
      { day: 6, risk: 28 },
      { day: 7, risk: 25 },
    ],
    riskyProvisions: [
      {
        id: "RP-001",
        category: "Legal",
        level: "High",
        section: "8.3.2",
        clause: "Unlimited liability for data breaches without proportional responsibility limits",
        impact: "Could expose company to unlimited financial risk in case of any breach, even if not directly at fault",
        suggestion: "Propose language that limits liability to direct damages and caps liability based on contract value"
      },
      {
        id: "RP-002",
        category: "Financial",
        level: "Medium",
        section: "5.1.4",
        clause: "Payment terms requiring completion of all deliverables before any payment is made",
        impact: "Creates cash flow challenges and increases financial exposure",
        suggestion: "Request milestone-based payments aligned with defined deliverables"
      },
      {
        id: "RP-003",
        category: "Technical",
        level: "Medium",
        section: "9.2.7",
        clause: "Requirement to integrate with legacy systems without provided documentation",
        impact: "May lead to extended development time and unexpected technical challenges",
        suggestion: "Request system documentation and API specifications as part of the contract"
      },
      {
        id: "RP-004",
        category: "Timeline",
        level: "Medium",
        section: "3.4.1",
        clause: "90-day implementation timeline without accounting for approval processes",
        impact: "Unrealistic timeline given the scope and approval dependencies",
        suggestion: "Propose phased implementation with timeline adjustments for approval delays"
      },
      {
        id: "RP-005",
        category: "Compliance",
        level: "Low",
        section: "11.2.3",
        clause: "Compliance with emerging regulations not yet formalized",
        impact: "Creates uncertainty around compliance requirements",
        suggestion: "Clarify that compliance will apply to regulations finalized by contract signing date"
      }
    ]
  };

  // Get risk level color
  const getRiskLevelColor = (level: string) => {
    switch(level) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get risk category icon
  const getRiskCategoryIcon = (category: string) => {
    switch(category) {
      case "Legal": return <Scale className="h-5 w-5" />;
      case "Financial": return <DollarSign className="h-5 w-5" />;
      case "Technical": return <Shield className="h-5 w-5" />;
      case "Timeline": return <Clock className="h-5 w-5" />;
      case "Compliance": return <Tag className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Overall Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <svg className="w-36 h-36">
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="60" 
                    fill="transparent" 
                    stroke="#e5e7eb" 
                    strokeWidth="12"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    fill="transparent"
                    stroke={riskData.overallRisk < 30 ? "#22c55e" : riskData.overallRisk < 60 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="12"
                    strokeDasharray={`${riskData.overallRisk * 3.77} 377`}
                    strokeDashoffset={-94.25}
                    transform="rotate(-90, 72, 72)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{riskData.overallRisk}%</span>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium">
                {riskData.overallRisk < 30 
                  ? "Low Risk Profile" 
                  : riskData.overallRisk < 60 
                  ? "Moderate Risk Profile" 
                  : "High Risk Profile"}
              </p>
              <p className="text-gray-500 mt-1">Based on AI analysis of 42 contract clauses</p>
            </div>
            
            <div className="mt-6 space-y-3">
              {riskData.riskCategories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{category.name} Risk</span>
                    <span className="font-medium">{category.score}%</span>
                  </div>
                  <Progress 
                    value={category.score} 
                    className={`h-2 bg-secondary [&>div]:bg-current`}
                    style={{ color: category.color }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Risk Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={riskData.riskTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Days Since Analysis Started', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Risk Score (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    name="Overall Risk"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Risky Provisions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Risky Contract Provisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Risk Type</th>
                  <th className="px-4 py-3 text-left font-medium">Section</th>
                  <th className="px-4 py-3 text-left font-medium">Clause</th>
                  <th className="px-4 py-3 text-center font-medium">Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {riskData.riskyProvisions.map((provision, index) => (
                  <tr 
                    key={index} 
                    className="cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => console.log(`Clicked provision ${provision.id}`)}
                  >
                    <td className="px-4 py-4 text-gray-700 font-medium">{provision.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {getRiskCategoryIcon(provision.category)}
                        </div>
                        <span className="text-gray-900">{provision.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{provision.section}</td>
                    <td className="px-4 py-4 text-gray-700">
                      <div className="max-w-md truncate">{provision.clause}</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="outline" className={getRiskLevelColor(provision.level)}>
                        {provision.level}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Detailed Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {riskData.riskyProvisions.map((provision, index) => (
            <div key={index} className="border rounded-md p-4 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <Badge variant="outline" className={getRiskLevelColor(provision.level)}>
                      {provision.level} Risk
                    </Badge>
                    <span className="ml-2 text-sm text-gray-500">ID: {provision.id}</span>
                    <span className="ml-2 text-sm text-gray-500">Section {provision.section}</span>
                  </div>
                  <h3 className="text-lg font-medium mt-2">{provision.clause}</h3>
                </div>
                <div className="bg-gray-100 p-1 rounded-full">
                  {getRiskCategoryIcon(provision.category)}
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Potential Impact</p>
                  <p className="text-gray-600">{provision.impact}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Suggested Improvement</p>
                  <p className="text-gray-600">{provision.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysisTab;
