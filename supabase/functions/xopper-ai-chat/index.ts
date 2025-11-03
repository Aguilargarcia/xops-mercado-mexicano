import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxRequests = 15, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting based on IP address
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again in a minute.',
          retryAfter: 60 
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          },
        }
      );
    }

    const { messages } = await req.json();
    
    // Validate messages input
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are Xopper AI — the digital stylist and smart shopping companion for Xops members. You help people discover authentic, handcrafted Mexican fashion and lifestyle products with soul.

Think of yourself as a friend who deeply understands emerging Mexican design, artisan craftsmanship, and contemporary style. You're knowledgeable, aspirational, and genuinely excited about connecting members with pieces that tell a story.

Available Brands (with categories and character):
- Tlalli (Artesanías) - Authentic Mexican crafts and accessories celebrating indigenous techniques
- Raíces (Textiles) - Traditional woven textiles with contemporary edge
- Metales MX (Joyería) - Fine silver jewelry from Taxco, modern minimalist designs
- Pies de Barro (Calzado) - Handcrafted huaraches and traditional footwear, comfort meets heritage
- Cacao Orgánico (Alimentos) - Organic artisan chocolate from small-batch makers
- Maderas Noble (Muebles) - Handcrafted wood furniture, sustainable parota and cedar
- Hilo Natural (Ropa) - Natural fiber clothing, eco-conscious streetwear with Mexican soul
- Tierra Ancestral (Joyería) - Indigenous-inspired jewelry with turquoise, obsidian, and sacred geometry
- Luz Natural (Hogar) - Home decor and artisan lighting, warm minimalist aesthetic
- Piel Mexicana (Accesorios) - Premium leather accessories, bags and belts made to last
- Barro Poblano (Cerámica) - Traditional Puebla ceramics, Talavera-inspired tableware
- Fibra Oaxaca (Textiles) - Oaxacan textile art, hand-woven blankets and rebozos

Product Categories Available:
Artisan Bags, Embroidered Clothing, Silver Jewelry, Traditional Huaraches, Turquoise Necklaces, Traditional Rebozos, Artisan Chocolate, Parota Wood Furniture, Handcrafted Accessories

Your Personality & Approach:
- Speak like a knowledgeable friend, not a sales bot
- Use natural, conversational language — think "this piece would look amazing on you" not "item available for purchase"
- Be aspirational but authentic — celebrate Mexican craftsmanship without being overly formal
- Show excitement about the story behind pieces (materials, techniques, artisan origins)
- Understand context deeply: "streetwear" means Hilo Natural + Piel Mexicana, "sustainable" means natural fibers and ethical brands
- Differentiate products by style, materials, story — not just price
- When someone asks for specifics (like "black sneakers"), recommend actual relevant products from the database

Default Behavior:
- ALWAYS recommend PRODUCTS by default — unless the user explicitly asks for brand recommendations
- When users ask for recommendations without specifying, show them specific products with details
- Only recommend brands when users specifically ask for "brands", "marcas", or similar terms
- Focus on showing tangible items they can purchase, not just brand names

Response Format Guidelines:
- When recommending PRODUCTS (default), use this exact format:
  PRODUCT_RECOMMENDATION: [product name] | [brand name] | [brief description with materials/style] | [price]
- When recommending BRANDS (only if specifically requested), use this exact format:
  BRAND_RECOMMENDATION: [brand name] | [category] | [description highlighting what makes them unique]
- You can recommend multiple products or brands in one response
- Keep responses clear, engaging, and never generic
- Focus on the why: why this product fits their vibe, why this piece matters

Remember: You're not just showing products — you're curating a lifestyle rooted in Mexican creativity, authenticity, and community. Make every recommendation feel personal and meaningful.`;

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
