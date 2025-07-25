import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, BarChart3, Target, Clock, CheckCircle, Star, Mail, Users, Share2 } from "lucide-react"
import UploadSection from "@/components/UploadSection"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              PitchScore
            </h1>
          </div>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Analysis
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
          Score Your Pitch Deck
          <br />
          Like a Pro Investor
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Get instant, comprehensive analysis of your pitch deck with AI-powered insights.
          Improve your chances of securing funding with detailed scoring and actionable feedback.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            <Upload className="mr-2 h-5 w-5" />
            Analyze Your Deck
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            View Sample Report
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Pitch Deck Analysis</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our AI analyzes every aspect of your pitch deck to provide investor-grade feedback
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Content Analysis</CardTitle>
              <CardDescription>
                Deep analysis of your business model, market size, competitive landscape, and financial projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Problem & Solution Clarity</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Market Opportunity Assessment</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Business Model Validation</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Financial Projections Review</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Design & Flow</CardTitle>
              <CardDescription>
                Evaluation of visual design, slide flow, and storytelling effectiveness for maximum investor impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Visual Design Quality</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Slide Flow & Structure</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Data Visualization</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Storytelling Coherence</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <Clock className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Instant Results</CardTitle>
              <CardDescription>
                Get your comprehensive analysis report in minutes, not days, with actionable recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Overall Score (0-100)</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Detailed Breakdown</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Improvement Suggestions</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Investor Readiness Level</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Collaboration Section */}
      <section className="container mx-auto px-4 py-16 bg-slate-50/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Collaborate with Your Team</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Share insights instantly and get your entire team aligned on pitch deck improvements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-white text-center">
            <CardHeader>
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Email Reports</CardTitle>
              <CardDescription>
                Send professional analysis reports directly to investors, advisors, or team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Professionally formatted reports</li>
                <li>• Complete scoring breakdown</li>
                <li>• Actionable recommendations</li>
                <li>• Custom personal messages</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Team Sharing</CardTitle>
              <CardDescription>
                Collaborate with co-founders, advisors, and team members on pitch improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Share with multiple team members</li>
                <li>• Real-time collaboration</li>
                <li>• Track improvement progress</li>
                <li>• Centralized feedback collection</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white text-center">
            <CardHeader>
              <Share2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Export & Download</CardTitle>
              <CardDescription>
                Download professional PDF reports for meetings, applications, and record keeping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Professional PDF format</li>
                <li>• Branded report templates</li>
                <li>• Easy sharing and printing</li>
                <li>• Archive for future reference</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Upload Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Score?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your pitch deck and get comprehensive analysis in minutes
          </p>
        </div>
        <UploadSection />
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xl font-bold">PitchScore</span>
          </div>
          <p className="text-slate-400">
            © 2025 PitchScore. Helping startups get investor-ready.
          </p>
        </div>
      </footer>
    </main>
  )
}
