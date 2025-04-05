
import { ArrowRight, CheckCircle, AlertTriangle, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
        Analyze RFPs with <span className="text-rfp-blue">AI-Powered Insights</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Quickly analyze government RFPs, assess eligibility, identify risks, and generate 
        comprehensive reports to make smarter bidding decisions.
      </p>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
        <Link to="/analysis">
          <Button className="text-white bg-rfp-blue hover:bg-rfp-blue/90 px-8 py-6">
            View Demo Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Button variant="outline" className="px-8 py-6">
          Learn More
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="bg-rfp-blue/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-rfp-blue" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Eligibility Assessment</h3>
          <p className="text-gray-600">Automatically compare RFP requirements with your company capabilities.</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="bg-rfp-red/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-rfp-red" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Risk Analysis</h3>
          <p className="text-gray-600">Identify potential legal, financial, and operational risks in RFP clauses.</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="bg-rfp-green/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <CheckSquare className="h-6 w-6 text-rfp-green" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Submission Checklist</h3>
          <p className="text-gray-600">Never miss a required document with our auto-generated submission checklist.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
