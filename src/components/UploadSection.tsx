"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, FileText, CheckCircle, AlertCircle, BarChart3, TrendingUp, Target, Lightbulb, Mail, Share2, Users, Download } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [emailData, setEmailData] = useState({ to: "", subject: "", message: "" })
  const [shareData, setShareData] = useState({ emails: "", message: "" })

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find(file => file.type === "application/pdf")

    if (pdfFile) {
      setFile(pdfFile)
    }
  }, [])

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    }
  }

  const analyzeFile = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setProgress(0)

    // Simulate analysis process
    const steps = [
      "Parsing PDF content...",
      "Analyzing content structure...",
      "Evaluating market opportunity...",
      "Assessing business model...",
      "Reviewing financial projections...",
      "Analyzing design quality...",
      "Generating recommendations..."
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setProgress(((i + 1) / steps.length) * 100)
    }

    // Simulate analysis result
    const mockResult: AnalysisResult = {
      overallScore: 76,
      breakdown: {
        contentClarity: 82,
        marketOpportunity: 74,
        businessModel: 79,
        financialProjections: 68,
        designQuality: 85,
        storytelling: 72
      },
      feedback: {
        strengths: [
          "Clear problem-solution fit",
          "Strong visual design and presentation",
          "Well-defined target market",
          "Experienced team background"
        ],
        improvements: [
          "Financial projections need more detail",
          "Competition analysis could be stronger",
          "Revenue model requires clarification",
          "Go-to-market strategy needs refinement"
        ],
        suggestions: [
          "Add 3-year financial forecasts with key assumptions",
          "Include competitive differentiation matrix",
          "Specify customer acquisition costs and channels",
          "Add testimonials or early customer validation"
        ]
      },
      investorReadiness: "Good"
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const resetAnalysis = () => {
    setFile(null)
    setResult(null)
    setProgress(0)
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const sendEmailReport = async () => {
    // Simulate email sending
    console.log("Sending email report:", emailData)
    // In a real app, this would call an API to send the email
    alert(`Report sent to ${emailData.to}!`)
    setIsEmailOpen(false)
    setEmailData({ to: "", subject: "", message: "" })
  }

  const shareWithTeam = async () => {
    // Simulate team sharing
    console.log("Sharing with team:", shareData)
    // In a real app, this would send invitations to team members
    alert(`Analysis shared with team members!`)
    setIsShareOpen(false)
    setShareData({ emails: "", message: "" })
  }

  const generateEmailSubject = () => {
    return `Pitch Deck Analysis Report - Score: ${result?.overallScore}/100 (${result?.investorReadiness})`
  }

  const generateEmailMessage = () => {
    if (!result || !file) return ""

    return `Hi there,

I've analyzed the pitch deck "${file.name}" using PitchScore and wanted to share the results with you.

📊 OVERALL SCORE: ${result.overallScore}/100 (${result.investorReadiness})

🎯 KEY METRICS:
• Content Clarity: ${result.breakdown.contentClarity}/100
• Market Opportunity: ${result.breakdown.marketOpportunity}/100
• Business Model: ${result.breakdown.businessModel}/100
• Financial Projections: ${result.breakdown.financialProjections}/100
• Design Quality: ${result.breakdown.designQuality}/100
• Storytelling: ${result.breakdown.storytelling}/100

✅ STRENGTHS:
${result.feedback.strengths.map(s => `• ${s}`).join('\n')}

🔄 AREAS FOR IMPROVEMENT:
${result.feedback.improvements.map(i => `• ${i}`).join('\n')}

💡 RECOMMENDATIONS:
${result.feedback.suggestions.map(s => `• ${s}`).join('\n')}

This analysis was generated by PitchScore - helping startups get investor-ready.

Best regards!`
  }

  const downloadPDFReport = () => {
    // Simulate PDF generation and download
    alert("PDF report generated! In a real app, this would download a professionally formatted PDF report.")
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <CardTitle className="text-2xl">Analysis Complete!</CardTitle>
            </div>
            <CardDescription>
              Your pitch deck "{file?.name}" has been analyzed
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="text-4xl font-bold">{result.overallScore}</span>
              <span className="text-2xl text-gray-500">/100</span>
              <Badge className={getScoreBadgeColor(result.overallScore)}>
                {result.investorReadiness}
              </Badge>
            </div>
            <p className="text-gray-600 mb-6">
              Your pitch deck shows strong potential with room for strategic improvements
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <Button onClick={resetAnalysis} variant="outline">
                Analyze Another Deck
              </Button>

              <Popover open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Report
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Email Analysis Report</h3>
                    <div className="space-y-2">
                      <Label htmlFor="email-to">To:</Label>
                      <Input
                        id="email-to"
                        placeholder="recipient@email.com"
                        value={emailData.to}
                        onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Subject:</Label>
                      <Input
                        id="email-subject"
                        value={emailData.subject || generateEmailSubject()}
                        onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-message">Message:</Label>
                      <Textarea
                        id="email-message"
                        rows={6}
                        value={emailData.message || generateEmailMessage()}
                        onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={sendEmailReport} className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Report
                      </Button>
                      <Button variant="outline" onClick={() => setIsEmailOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100">
                    <Users className="mr-2 h-4 w-4" />
                    Share with Team
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Share with Team Members</h3>
                    <div className="space-y-2">
                      <Label htmlFor="share-emails">Team Email Addresses:</Label>
                      <Textarea
                        id="share-emails"
                        placeholder="teammate1@company.com, teammate2@company.com"
                        value={shareData.emails}
                        onChange={(e) => setShareData({...shareData, emails: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="share-message">Personal Message (Optional):</Label>
                      <Textarea
                        id="share-message"
                        placeholder="Hey team, please review our latest pitch deck analysis..."
                        value={shareData.message}
                        onChange={(e) => setShareData({...shareData, message: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={shareWithTeam} className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Analysis
                      </Button>
                      <Button variant="outline" onClick={() => setIsShareOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                onClick={downloadPDFReport}
                className="bg-purple-50 text-purple-600 hover:bg-purple-100"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Detailed Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(result.breakdown).map(([key, score]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`font-bold ${getScoreColor(score)}`}>
                      {score}/100
                    </span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Strengths */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <TrendingUp className="mr-2 h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-600">
                <Target className="mr-2 h-5 w-5" />
                Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Lightbulb className="mr-2 h-5 w-5" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <Lightbulb className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle>Upload Your Pitch Deck</CardTitle>
          <CardDescription>
            Upload a PDF of your pitch deck to get instant analysis and scoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Drop your pitch deck here
              </h3>
              <p className="text-gray-500 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={onFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span>Choose PDF File</span>
                </Button>
              </label>
              <p className="text-xs text-gray-400 mt-2">
                PDF files only, max 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {!isAnalyzing ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setFile(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                    <FileText className="h-8 w-8 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-blue-600">Analyzing...</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              )}

              {!isAnalyzing && (
                <div className="flex justify-center">
                  <Button onClick={analyzeFile} size="lg" className="w-full">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Analyze Pitch Deck
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
