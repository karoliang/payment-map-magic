/**
 * Stripe Payment Integration Utilities
 * 
 * Requirements:
 * 1. Supabase project with Edge Functions enabled
 * 2. Stripe account and API keys
 * 3. Environment variables:
 *    - STRIPE_SECRET_KEY in Supabase Edge Function secrets
 * 
 * @example
 * ```typescript
 * // Create a checkout session
 * const { data, error } = await createCheckoutSession('price_123');
 * if (data?.url) {
 *   window.location.href = data.url;
 * }
 * 
 * // Check subscription status
 * const { data: status } = await checkSubscriptionStatus('price_123');
 * if (status?.subscribed) {
 *   // User is subscribed
 * }
 * ```
 */

import { supabase } from "@/integrations/supabase/client";

/**
 * Creates a Stripe checkout session for the specified price
 * @param priceId - The Stripe Price ID for the product
 * @returns Promise with the checkout session URL
 */
export async function createCheckoutSession(priceId: string) {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { data: null, error };
  }
}

/**
 * Checks if the current user is subscribed to a specific price
 * @param priceId - The Stripe Price ID to check
 * @returns Promise with subscription status
 */
export async function checkSubscriptionStatus(priceId: string) {
  try {
    const { data, error } = await supabase.functions.invoke('check-subscription', {
      body: { priceId },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { data: null, error };
  }
}