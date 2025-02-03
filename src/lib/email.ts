import { supabase } from "@/integrations/supabase/client";

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error sending email:', error);
    return { data: null, error };
  }
}