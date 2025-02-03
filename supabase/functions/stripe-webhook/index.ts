import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  
  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured');
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      webhookSecret
    );

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    console.log('Processing webhook event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const spaceId = session.metadata?.space_id;
        
        if (spaceId) {
          await supabaseClient
            .from('spaces')
            .update({ is_featured: true })
            .eq('id', spaceId);
          
          console.log(`Updated space ${spaceId} to featured status`);
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // Find the latest successful checkout session for this subscription
        const sessions = await stripe.checkout.sessions.list({
          subscription: subscription.id,
          limit: 1,
        });
        
        if (sessions.data[0]?.metadata?.space_id) {
          await supabaseClient
            .from('spaces')
            .update({ is_featured: false })
            .eq('id', sessions.data[0].metadata.space_id);
          
          console.log(`Updated space ${sessions.data[0].metadata.space_id} to non-featured status`);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
});