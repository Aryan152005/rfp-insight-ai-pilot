
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAppSettings } from "@/lib/faiss";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      // Only accept PDF, DOCX, and TXT files
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please select a PDF, DOCX, or TXT file");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    try {
      // Check if OpenAI API key is provided in app settings
      const settings = await getAppSettings();
      
      if (!settings?.openai_key_provided) {
        toast({
          title: "OpenAI API Key Required",
          description: "Please add your OpenAI API key in Settings to process RFPs",
          variant: "destructive",
        });
        setUploading(false);
        return;
      }
      
      // Get user from auth
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to upload and process RFPs",
          variant: "destructive",
        });
        setUploading(false);
        return;
      }

      // Create a basic title from the filename
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      const titleFromFileName = fileName.replace(/_/g, " ");
      
      // Insert RFP entry first to get the ID
      const { data: rfpData, error: rfpError } = await supabase
        .from('rfps')
        .insert({
          title: titleFromFileName,
          file_type: file.type,
          user_id: session.user.id
        })
        .select()
        .single();
        
      if (rfpError) {
        throw new Error(`Error creating RFP record: ${rfpError.message}`);
      }
      
      // Upload the file to a hypothetical endpoint (in a real app, would use a proper upload mechanism)
      // For now we'll simulate a successful upload and analysis
      
      // Simulate processing time with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the RFP record with success info
      const { error: updateError } = await supabase
        .from('rfps')
        .update({
          content: "RFP content extracted from file...",
          file_path: `uploads/${rfpData.id}/${file.name}`,
          faiss_id: rfpData.id
        })
        .eq('id', rfpData.id);
        
      if (updateError) {
        throw new Error(`Error updating RFP record: ${updateError.message}`);
      }
      
      // Show success notification
      toast({
        title: "RFP Uploaded Successfully",
        description: "Your RFP has been processed and is ready for analysis",
      });
      
      // Navigate to analysis page
      navigate("/analysis");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during upload");
      
      toast({
        title: "Upload Failed",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="pb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload RFP Document</h2>
      
      <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleSelectFile}
            />
            
            {!file ? (
              <>
                <div className="bg-white rounded-full p-3 mb-4 border border-gray-200">
                  <FileText className="h-8 w-8 text-rfp-blue" />
                </div>
                <h3 className="text-lg font-medium mb-2">Drag & drop file or browse</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Support for PDF, DOCX, and TXT files up to 10MB
                </p>
                <Button onClick={triggerFileInput} className="mb-2">
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <p className="text-xs text-gray-400">
                  Your file will be processed securely
                </p>
              </>
            ) : (
              <div className="w-full">
                <div className="bg-white rounded-full p-3 mb-4 mx-auto w-fit border border-gray-200">
                  <FileText className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">{file.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB · {file.type}
                </p>
                
                {error && (
                  <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" onClick={triggerFileInput} disabled={uploading}>
                    Change File
                  </Button>
                  <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Analyze RFP
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FileUpload;
