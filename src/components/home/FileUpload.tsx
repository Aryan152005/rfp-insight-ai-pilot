
import { useState } from "react";
import { Upload, File, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const FileUpload = () => {
  const [rfpFile, setRfpFile] = useState<File | null>(null);
  const [companyData, setCompanyData] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRfpFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRfpFile(e.target.files[0]);
    }
  };

  const handleCompanyDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyData(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rfpFile) {
      toast({
        title: "Missing RFP File",
        description: "Please upload an RFP document to analyze.",
        variant: "destructive",
      });
      return;
    }

    // Simulate file upload and processing
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Analysis Started",
        description: "Your RFP is being analyzed. You'll be redirected shortly.",
      });
      
      // Redirect to analysis page
      setTimeout(() => navigate("/analysis"), 1500);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <Card className="border-2 border-dashed border-gray-200 bg-white shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="sample">Use Sample Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* RFP Document Upload */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">RFP Document</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <input
                        id="rfp-file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleRfpFileChange}
                        className="hidden"
                      />
                      <label htmlFor="rfp-file" className="cursor-pointer text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rfp-blue/10">
                          <File className="h-6 w-6 text-rfp-blue" />
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {rfpFile ? rfpFile.name : "Upload RFP Document"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          PDF, DOC or DOCX (max 20MB)
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Company Data Upload */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Company Profile (Optional)</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <input
                        id="company-data"
                        type="file"
                        accept=".json,.csv"
                        onChange={handleCompanyDataChange}
                        className="hidden"
                      />
                      <label htmlFor="company-data" className="cursor-pointer text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rfp-teal/10">
                          <Database className="h-6 w-6 text-rfp-teal" />
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {companyData ? companyData.name : "Upload Company Data"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          JSON or CSV (max 5MB)
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-rfp-blue hover:bg-rfp-blue/90 py-6"
                  disabled={loading || !rfpFile}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Start Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="sample" className="space-y-8 mt-6">
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="font-medium mb-2">Sample RFP: IT Modernization Project</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This is a sample government RFP for modernizing legacy systems with integrated requirements and specifications.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Sample RFP Selected",
                      description: "The sample RFP has been selected for analysis."
                    });
                  }}
                >
                  <File className="mr-2 h-4 w-4" />
                  Use Sample RFP
                </Button>
              </div>
              
              <Button
                className="w-full bg-rfp-blue hover:bg-rfp-blue/90 py-6"
                onClick={() => {
                  setLoading(true);
                  toast({
                    title: "Loading Sample Data",
                    description: "Preparing sample analysis dashboard.",
                  });
                  
                  setTimeout(() => {
                    setLoading(false);
                    navigate("/analysis");
                  }, 1500);
                }}
                disabled={loading}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    View Sample Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500 bg-gray-50 border-t">
          <p>Supported formats: PDF, DOC, DOCX, JSON, CSV</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileUpload;
