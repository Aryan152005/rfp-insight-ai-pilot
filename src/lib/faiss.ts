
// FAISS vector database utilities
import { supabase } from "@/integrations/supabase/client";
import { AppSettings } from "./supabaseTypes";

// Check if FAISS mode is enabled in app settings
export const checkFaissEnabled = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('use_faiss')
      .maybeSingle();
      
    if (error) {
      console.error("Error checking FAISS settings:", error);
      return true; // Default to enabled if we can't check
    }
    
    return data?.use_faiss !== false; // Default to true if not explicitly set to false
  } catch (err) {
    console.error("Exception checking FAISS settings:", err);
    return true; // Default to enabled on error
  }
};

// Get all app settings
export const getAppSettings = async (): Promise<AppSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching app settings:", error);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Exception fetching app settings:", err);
    return null;
  }
};

// Update app settings
export const updateAppSettings = async (
  settings: Partial<AppSettings>
): Promise<AppSettings | null> => {
  try {
    // First check if settings exist for the current user
    const { data: existingSettings } = await supabase
      .from('app_settings')
      .select('id')
      .maybeSingle();
    
    if (existingSettings) {
      // Update existing settings
      const { data, error } = await supabase
        .from('app_settings')
        .update({
          ...settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings.id)
        .select()
        .single();
        
      if (error) {
        console.error("Error updating app settings:", error);
        return null;
      }
      
      return data;
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('app_settings')
        .insert({
          ...settings,
          use_faiss: settings.use_faiss ?? true,
          use_supabase: settings.use_supabase ?? true,
        })
        .select()
        .single();
        
      if (error) {
        console.error("Error creating app settings:", error);
        return null;
      }
      
      return data;
    }
  } catch (err) {
    console.error("Exception updating app settings:", err);
    return null;
  }
};
