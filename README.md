# 📊 PitchScore - AI-Powered Pitch Deck Analyzer

**PitchScore** is a comprehensive SaaS platform that analyzes startup pitch decks using AI and provides investor-grade feedback with actionable recommendations.

![PitchScore](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-purple)

## 🚀 Live Demo

**🌐 Live Site**: [https://same-r7afm40zmri-latest.netlify.app](https://same-r7afm40zmri-latest.netlify.app)

## ✨ Features

### 📈 Comprehensive Analysis
- **AI-Powered Scoring** - GPT-4 Turbo analysis with 6 key investor metrics
- **Content Clarity** - Problem-solution fit and value proposition assessment
- **Market Opportunity** - Market size, growth potential, and competitive landscape
- **Business Model** - Revenue model clarity and scalability evaluation
- **Financial Projections** - Forecast quality and assumption validation
- **Design Quality** - Visual appeal and information hierarchy analysis
- **Storytelling** - Narrative coherence and investor engagement

### 🤝 Team Collaboration
- **Email Reports** - Send professional analysis reports to investors and advisors
- **Team Sharing** - Collaborate with co-founders and team members
- **PDF Export** - Download branded reports for meetings and applications
- **Custom Messages** - Personalize communications with context

### 🎨 Professional Design
- **Modern SaaS UI** - Clean, responsive design with professional styling
- **Drag & Drop Upload** - Intuitive file upload with PDF validation
- **Real-time Progress** - Live analysis progress tracking
- **Detailed Results** - Comprehensive scoring breakdown with visual charts

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.2** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling framework
- **shadcn/ui** - Professional component library
- **Lucide React** - Icon system

### Backend
- **Next.js API Routes** - Server-side endpoints
- **OpenAI API** - GPT-4 Turbo for AI analysis
- **pdf-parse** - PDF text extraction
- **Node.js** - Runtime environment

### Development Tools
- **Bun** - Package manager and runtime
- **Biome** - Code formatting and linting
- **Turbopack** - Fast development builds

## 📁 Project Structure

```
pitch-deck-analyzer/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   └── api/
│   │       └── analyze-pitch/
│   │           └── route.ts      # AI analysis endpoint
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   └── UploadSection.tsx     # Main upload component
│   └── lib/
│       └── utils.ts              # Utility functions
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** or **Bun 1.0+**
- **OpenAI API Key** - Get from [OpenAI Platform](https://platform.openai.com/api-keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pitchscore.git
   cd pitchscore
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📊 API Documentation

### Analyze Pitch Deck

**Endpoint**: `POST /api/analyze-pitch`

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (PDF file)

**Response**:
```typescript
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
    "strengths": string[],
    "improvements": string[],
    "suggestions": string[]
  },
  "investorReadiness": "Poor" | "Fair" | "Good" | "Excellent"
}
```

## 🔧 Configuration

### OpenAI Settings
- **Model**: `gpt-4-turbo-preview`
- **Temperature**: `0.3` (for consistent results)
- **Max Tokens**: `2000`
- **Response Format**: `json_object`

### File Upload Limits
- **File Type**: PDF only
- **Max Size**: 10MB
- **Text Limit**: 8000 characters for analysis

## 🚀 Deployment

### Deploy to Netlify (Current)
```bash
# Build and deploy
bun run build
netlify deploy --prod --dir=out
```

### Deploy to Vercel (Recommended for Full Backend)
```bash
# Deploy with API routes
vercel deploy
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4 API
- **shadcn/ui** for the excellent component library
- **Vercel** for the Next.js framework
- **Same.new** for the development environment

## 📞 Support

For support, email support@pitchscore.com or open an issue on GitHub.

---

**Built with ❤️ for the startup community**
