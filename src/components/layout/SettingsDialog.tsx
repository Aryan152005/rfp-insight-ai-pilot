
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getAppSettings, updateAppSettings } from "@/lib/faiss";
import { AppSettings } from "@/lib/supabaseTypes";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openAIKey, setOpenAIKey] = useState("");
  const [useFaiss, setUseFaiss] = useState(true);
  const [useSupabase, setUseSupabase] = useState(true);
  const [openAIKeyProvided, setOpenAIKeyProvided] = useState(false);

  useEffect(() => {
    if (open) {
      loadSettings();
    }
  }, [open]);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const settings = await getAppSettings();
      if (settings) {
        setUseFaiss(settings.use_faiss);
        setUseSupabase(settings.use_supabase);
        setOpenAIKeyProvided(settings.openai_key_provided);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      const updatedSettings: Partial<AppSettings> = {
        use_faiss: useFaiss,
        use_supabase: useSupabase
      };
      
      // Only update OpenAI key if provided
      if (openAIKey) {
        // In a real app, we would store this securely
        // For this demo, we just mark that it was provided
        updatedSettings.openai_key_provided = true;
      }
      
      await updateAppSettings(updatedSettings);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      });
      
      // Close dialog after saving
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>App Settings</DialogTitle>
          <DialogDescription>
            Configure your RFP Automation settings here.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="use-faiss">Use FAISS Vector Search</Label>
              <Switch
                id="use-faiss"
                checked={useFaiss}
                onCheckedChange={setUseFaiss}
                disabled={isLoading}
              />
            </div>
            <p className="text-sm text-gray-500">
              Enable FAISS for semantic document search across RFP content.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="use-supabase">Use Supabase Database</Label>
              <Switch
                id="use-supabase"
                checked={useSupabase}
                onCheckedChange={setUseSupabase}
                disabled={isLoading}
              />
            </div>
            <p className="text-sm text-gray-500">
              Store application data in Supabase and enable real-time updates.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <Input
              id="openai-key"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder={openAIKeyProvided ? "••••••••" : "Enter your OpenAI API key"}
              type="password"
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500">
              Required for using OpenAI embeddings with FAISS vector search.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={saveSettings} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
