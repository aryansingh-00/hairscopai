import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting scalp analysis...');

    const systemPrompt = `You are an expert AI dermatologist specializing in hair and scalp health analysis. Analyze the provided scalp/hair image and provide a comprehensive assessment.

Your response MUST be a valid JSON object with this exact structure:
{
  "healthScore": <number 0-100>,
  "conditions": [
    { "name": "<condition name>", "severity": "<mild|moderate|severe>", "description": "<brief description>" }
  ],
  "causes": [
    { "category": "<lifestyle|nutrition|genetics|hygiene|environmental>", "description": "<specific cause>" }
  ],
  "recommendations": [
    { "type": "<home_remedy|product|medical|lifestyle>", "title": "<short title>", "description": "<detailed recommendation>" }
  ],
  "hairCareRoutine": {
    "daily": ["<routine item 1>", "<routine item 2>"],
    "weekly": ["<routine item 1>", "<routine item 2>"],
    "monthly": ["<routine item 1>"]
  },
  "dosAndDonts": {
    "dos": ["<do item 1>", "<do item 2>", "<do item 3>"],
    "donts": ["<dont item 1>", "<dont item 2>", "<dont item 3>"]
  },
  "overallAssessment": "<2-3 sentence summary of overall scalp health>"
}

Analyze for: dandruff, dryness, oiliness, hair thinning, bald patches, scalp redness, fungal issues, hair breakage, and overall hair health.

Be thorough but concise. Only return the JSON object, no other text.`;

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
          { 
            role: 'user', 
            content: [
              { type: 'text', text: 'Please analyze this scalp/hair image and provide a detailed health assessment.' },
              { 
                type: 'image_url', 
                image_url: { url: imageBase64 }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to analyze image' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'No analysis result received' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Raw AI response:', content);

    // Parse the JSON response
    let analysisResult;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse analysis result' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analysis complete:', analysisResult.healthScore);

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-scalp function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
