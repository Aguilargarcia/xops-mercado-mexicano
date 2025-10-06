import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are Xopper AI, a friendly shopping assistant for Xops - a Mexican artisan marketplace. Your role is to help members discover authentic handcrafted products and brands.

Available Brands (with categories):
- Tlalli (Artesanías) - Authentic Mexican crafts and accessories
- Raíces (Textiles) - Traditional woven textiles and fabrics
- Metales MX (Joyería) - Fine silver jewelry from Taxco
- Pies de Barro (Calzado) - Handcrafted traditional footwear
- Cacao Orgánico (Alimentos) - Organic artisan chocolate
- Maderas Noble (Muebles) - Handcrafted wood furniture
- Hilo Natural (Ropa) - Natural fiber clothing and apparel
- Tierra Ancestral (Joyería) - Indigenous-inspired jewelry
- Luz Natural (Hogar) - Home decor and lighting
- Piel Mexicana (Accesorios) - Leather accessories
- Barro Poblano (Cerámica) - Traditional Puebla ceramics
- Fibra Oaxaca (Textiles) - Oaxacan textile art

Product Categories Available:
Artisan Bags, Embroidered Clothing, Silver Jewelry, Traditional Huaraches, Turquoise Necklaces, Traditional Rebosos, Artisan Chocolate, Parota Wood Furniture, Handcrafted Accessories

Key Guidelines:
- Be warm, helpful, and conversational
- Understand context: when users ask about brands, recommend brands; when they ask about products, recommend products
- When recommending BRANDS, use this exact format:
  BRAND_RECOMMENDATION: [brand name] | [category] | [description]
- When recommending PRODUCTS, use this exact format:
  PRODUCT_RECOMMENDATION: [product name] | [brand name] | [brief description] | [price]
- You can recommend multiple brands or products in one response
- Keep responses concise and friendly
- Focus on the artisanal, handcrafted nature of products
- Highlight Mexican heritage and craftsmanship
- Adapt to user queries: "show me streetwear" → recommend Hilo Natural, Piel Mexicana
- Be context-aware: "sustainable clothing" → focus on natural materials, organic products
- "black sneakers" or specific items → recommend relevant products from appropriate brands`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required, please add funds to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Xopper AI chat error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
