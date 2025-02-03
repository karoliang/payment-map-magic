import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribe = async () => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to featured listing.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('create-featured-subscription', {
        body: { spaceId: 'your-space-id' },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 mb-8">
          {session ? "Get featured listing by subscribing!" : "Please log in to subscribe"}
        </p>
        {session ? (
          <Button 
            onClick={handleSubscribe} 
            disabled={isLoading}
            className="w-full max-w-xs"
          >
            {isLoading ? "Loading..." : "Subscribe to Featured Listing"}
          </Button>
        ) : (
          <Button 
            onClick={() => navigate("/auth")} 
            className="w-full max-w-xs"
          >
            Login to Subscribe
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;