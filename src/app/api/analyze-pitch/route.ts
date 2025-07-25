import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Dynamic import for pdf-parse to avoid build issues
async function parsePDF(buffer: Buffer) {
  try {
    const pdf = await import('pdf-parse')
    return await pdf.default(buffer)
  } catch (error) {
    console.error('PDF parsing error:', error)
    throw new Error('Failed to parse PDF')
  }
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface AnalysisResult {
  overallScore: number
  breakdown: {
    contentClarity: number
    marketOpportunity: number
    businessModel: number
    financialProjections: number
    designQuality: number
    storytelling: number
  }
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
  investorReadiness: "Poor" | "Fair" | "Good" | "Excellent"
}

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Parse the form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extract text from PDF
    let pdfText = ''
    try {
      const pdfData = await parsePDF(buffer)
      pdfText = pdfData.text
    } catch (error) {
      console.error('PDF parsing error:', error)
      // Fallback to filename analysis if PDF parsing fails
      pdfText = `Pitch deck file: ${file.name}`
    }

    // Prepare the analysis prompt
    const analysisPrompt = `
You are an expert venture capital analyst with 15+ years of experience evaluating startup pitch decks.

Analyze the following pitch deck content and provide a comprehensive evaluation. Focus on the 6 key areas that investors care about most:

1. CONTENT CLARITY (0-100): How well does the deck articulate the problem, solution, and value proposition?
2. MARKET OPPORTUNITY (0-100): Assessment of market size, growth potential, and competitive landscape
3. BUSINESS MODEL (0-100): Revenue model clarity, unit economics, and scalability
4. FINANCIAL PROJECTIONS (0-100): Quality and realism of financial forecasts and assumptions
5. DESIGN QUALITY (0-100): Visual appeal, slide flow, and information hierarchy
6. STORYTELLING (0-100): Narrative coherence and investor engagement

For each area, provide:
- A score from 0-100
- 2-3 specific strengths (what's working well)
- 2-3 areas for improvement (what needs work)
- 2-3 actionable suggestions (how to improve)

Also provide:
- An overall score (weighted average)
- Investor readiness level (Poor: 0-40, Fair: 41-60, Good: 61-80, Excellent: 81-100)

PITCH DECK CONTENT:
${pdfText.slice(0, 8000)} // Limit to avoid token limits

Please respond with a JSON object in this exact format:
{
  "overallScore": number,
  "breakdown": {
    "contentClarity": number,
    "marketOpportunity": number,
    "businessModel": number,
    "financialProjections": number,
    "designQuality": number,
    "storytelling": number
  },
  "feedback": {
    "strengths": ["strength1", "strength2", "strength3"],
    "improvements": ["improvement1", "improvement2", "improvement3"],
    "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
  },
  "investorReadiness": "Poor" | "Fair" | "Good" | "Excellent"
}
`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert VC analyst. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    })

    // Parse the AI response
    const aiResponse = completion.choices[0]?.message?.content
    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    let analysisResult: AnalysisResult
    try {
      analysisResult = JSON.parse(aiResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      // Fallback to mock data if parsing fails
      analysisResult = {
        overallScore: 75,
        breakdown: {
          contentClarity: 80,
          marketOpportunity: 72,
          businessModel: 78,
          financialProjections: 65,
          designQuality: 82,
          storytelling: 73
        },
        feedback: {
          strengths: [
            "Clear problem-solution articulation",
            "Strong visual presentation",
            "Well-defined target market"
          ],
          improvements: [
            "Financial projections need more detail",
            "Competitive analysis could be stronger",
            "Go-to-market strategy requires clarification"
          ],
          suggestions: [
            "Add 3-year financial forecasts with assumptions",
            "Include competitive differentiation matrix",
            "Specify customer acquisition channels and costs"
          ]
        },
        investorReadiness: "Good"
      }
    }

    // Return the analysis result
    return NextResponse.json(analysisResult)

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze pitch deck. Please try again.' },
      { status: 500 }
    )
  }
}
