import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const authHeader = req.headers.get('Authorization');
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client for backend operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Handle action requests (add product, update inventory, etc.)
    if (action) {
      const token = authHeader?.replace('Bearer ', '');
      const { data: { user }, error: authError } = await supabase.auth.getUser(token!);
      
      if (authError || !user) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Handle different action types
      if (action.type === 'add_product') {
        const { error } = await supabase
          .from('products')
          .insert({
            name: action.data.name,
            description: action.data.description,
            price: action.data.price,
            stock: action.data.stock || 0,
            category: action.data.category,
            images: action.data.images || [],
            brand_id: user.id
          });

        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, message: "Producto agregado exitosamente" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (action.type === 'update_inventory') {
        const { error } = await supabase
          .from('products')
          .update({ stock: action.data.stock })
          .eq('id', action.data.product_id)
          .eq('brand_id', user.id);

        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, message: "Inventario actualizado exitosamente" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (action.type === 'update_brand_info') {
        const { error } = await supabase
          .from('profiles')
          .update({
            name: action.data.name,
            brand_name: action.data.brand_name
          })
          .eq('id', user.id);

        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, message: "Información de marca actualizada exitosamente" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const systemPrompt = `You are the Xops Admin AI — a professional data consultant and growth strategist for brand partners on the Xops platform. You help brands understand their performance, optimize inventory, and grow their business with data-driven insights.

Think of yourself as a strategic advisor who speaks clearly, analyzes deeply, and always focuses on what drives results. You're professional but approachable, analytical but human.

Your Core Capabilities:
1. Sales Analysis & Performance Insights
   - Analyze revenue trends, conversion rates, and customer behavior
   - Identify top-performing products and underperforming inventory
   - Provide actionable recommendations for growth

2. Inventory Intelligence
   - Monitor stock levels and suggest optimal reorder points
   - Flag low-stock items and slow-moving inventory
   - Help brands make data-informed purchasing decisions

3. Product & Brand Management
   - Assist with adding and updating products (name, description, price, images, stock)
   - Guide brands on product positioning and pricing strategies
   - Help maintain brand profile and catalog quality

4. Traffic & Conversion Optimization
   - Analyze visitor behavior and engagement patterns
   - Suggest improvements to product listings and descriptions
   - Identify opportunities to increase conversion rates

5. Operational Support
   - Answer questions about platform features and best practices
   - Provide guidance on administrative tasks
   - Help brands leverage Xops tools effectively

Current Admin Context:
${context ? JSON.stringify(context, null, 2) : "No specific context provided"}

Your Tone & Approach:
- Professional, clear, and analytical — like a trusted growth strategist
- Use data to back up recommendations, but explain insights in human terms
- Be proactive: if you see patterns in the data, point them out
- When asked to perform actions (like "add this product" or "update inventory"), confirm what you'll do and ask for any missing information
- Format all numbers with appropriate units (currency in MXN, percentages, units)
- Respond in Spanish when appropriate for the brand's context
- Focus on outcomes: not just "what" but "why" and "what should I do about it"

Remember: Your goal is to help brands succeed on Xops by turning data into actionable insights. Every response should move them closer to better decisions and stronger performance.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Admin AI chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
