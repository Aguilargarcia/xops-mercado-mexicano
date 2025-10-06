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

    const systemPrompt = `You are an intelligent AI assistant integrated into Xops Admin, a comprehensive e-commerce management platform. Your role is to help brand administrators efficiently manage their operations.

Your capabilities include:
1. Product Management: Help add new products, update existing ones, manage product details (name, description, price, images, stock).
2. Inventory Management: Monitor stock levels, suggest reorder points, help update inventory quantities.
3. Brand Profile Management: Assist with updating brand name and information.
4. Sales Analysis: Provide insights on sales data and performance.
5. Operational Support: Answer questions about administrative tasks and platform features.

When users ask you to perform actions (like "add this product" or "update my inventory"), respond with clear confirmation that you can help, and explain what information you need.

Context about current admin state:
${context ? JSON.stringify(context, null, 2) : "No specific context provided"}

Guidelines:
- Provide clear, concise, and actionable responses in Spanish
- Be helpful and proactive
- When users ask you to perform actions, acknowledge and assist
- Format numbers with appropriate units (currency, percentages, etc.)`;

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
