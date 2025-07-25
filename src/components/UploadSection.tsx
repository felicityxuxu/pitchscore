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

    try {
      // Create FormData to send file to API
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress updates during API call
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      // Call the backend API for real analysis
      const response = await fetch('/api/analyze-pitch', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const analysisResult: AnalysisResult = await response.json()
      setResult(analysisResult)

    } catch (error) {
      console.error('Analysis error:', error)

      // Fallback to mock data if API fails
      const fallbackResult: AnalysisResult = {
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

      setResult(fallbackResult)

      // Show error message to user
      alert(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}. Showing demo results.`)
    } finally {
      setIsAnalyzing(false)
    }
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
    alert(`Report sent to ${emailData.to}!`)
    setIsEmailOpen(false)
    setEmailData({ to: "", subject: "", message: "" })
  }

  const shareWithTeam = async () => {
    // Simulate team sharing
    console.log("Sharing with team:", shareData)
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
    alert("PDF report generated! In a real app, this would download a professionally formatted PDF report.")
  }

  if (result) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center bg-white border border-gray-200 rounded-xl p-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
          <p className="text-gray-600 mb-4">
            Your pitch deck "{file?.name}" has been analyzed
          </p>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-4xl font-bold text-gray-900">{result.overallScore}</span>
            <span className="text-2xl text-gray-500">/100</span>
            <Badge className={getScoreBadgeColor(result.overallScore)}>
              {result.investorReadiness}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
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
        </div>

        {/* Score Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Detailed Score Breakdown
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(result.breakdown).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`font-bold ${getScoreColor(score)}`}>
                    {score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{width: `${score}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Strengths */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-green-600 mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Strengths
            </h4>
            <ul className="space-y-3">
              {result.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-yellow-600 mb-4 flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Improvements
            </h4>
            <ul className="space-y-3">
              {result.feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-600 mb-4 flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" />
              Suggestions
            </h4>
            <ul className="space-y-3">
              {result.feedback.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <Lightbulb className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-white"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Pitch Deck
          </h3>
          <p className="text-gray-600 mb-6">
            or drop a file,
          </p>
          <p className="text-sm text-gray-500 mb-6">
            paste PDF or <a href="#" className="text-blue-600 hover:underline">URL</a>
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={onFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 px-8">
              <span>Upload PDF</span>
            </Button>
          </label>

          <p className="text-xs text-gray-400 mt-4">
            No deck? Try one of these samples
          </p>
          <p className="text-xs text-gray-400 mt-2">
            By uploading, you agree to our Terms of Service
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {!isAnalyzing ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setFile(null)} size="sm">
                  Remove
                </Button>
              </div>

              <Button onClick={analyzeFile} className="w-full bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="mr-2 h-5 w-5" />
                Analyze Pitch Deck
              </Button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-8 w-8 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-blue-600">Analyzing your pitch deck...</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Analysis Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
