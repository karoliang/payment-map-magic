/**
 * Email Service Integration using Resend
 * 
 * Requirements:
 * 1. Supabase project with Edge Functions enabled
 * 2. Resend account and API key
 * 3. Environment variables:
 *    - RESEND_API_KEY in Supabase Edge Function secrets
 * 
 * @example
 * ```typescript
 * // Send a welcome email
 * await sendEmail(
 *   "user@example.com",
 *   "Welcome!",
 *   "<h1>Welcome to our app!</h1>"
 * );
 * ```
 */

import { supabase } from "@/integrations/supabase/client";

/**
 * Sends an email using Resend through Supabase Edge Functions
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - Email content in HTML format
 * @returns Promise with the send result
 */
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