
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, LineChart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthDialog from "@/components/auth/AuthDialog";

export const Hero = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  
  const handleGetStarted = async () => {
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      // User is already signed in, navigate to upload
      navigate("/analysis");
    } else {
      // Show login dialog
      setAuthTab("signup");
      setShowAuth(true);
    }
  };
  
  const handleSignIn = async () => {
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      // User is already signed in, navigate to dashboard
      navigate("/analysis");
    } else {
      // Show login dialog
      setAuthTab("login");
      setShowAuth(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
      <div className="lg:w-1/2">
        <div className="relative">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform rotate-3"></div>
          <img 
            src="/placeholder.svg" 
            alt="RFP Analysis Dashboard" 
            className="rounded-2xl shadow-lg border border-gray-200"
          />
        </div>
      </div>
      
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Automate Your <span className="text-rfp-blue">RFP Analysis</span> with Smart AI
        </h1>
        
        <p className="text-lg text-gray-600">
          Our platform uses AI to analyze RFPs, assess eligibility, identify risks, and build a response checklist. Save hours of manual review with smart document parsing.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <LineChart className="h-6 w-6 text-rfp-blue" />
            </div>
            <div>
              <h3 className="font-medium">Risk Analysis</h3>
              <p className="text-sm text-gray-600">Identify potential contractual risks</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Easy Upload</h3>
              <p className="text-sm text-gray-600">Supports PDF, DOCX, and TXT formats</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Team Collaboration</h3>
              <p className="text-sm text-gray-600">Share analyses with your team</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button size="lg" onClick={handleGetStarted}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </div>
      
      <AuthDialog 
        open={showAuth} 
        onOpenChange={setShowAuth} 
        defaultTab={authTab}
      />
    </div>
  );
};

export default Hero;
