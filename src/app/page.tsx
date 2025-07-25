import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, BarChart3, Target, Clock, CheckCircle, Star, Mail, Users, Share2, TrendingUp, Lightbulb } from "lucide-react"
import UploadSection from "@/components/UploadSection"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">PitchScore</span>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">API</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a>
            </nav>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Score Your Pitch Deck
            <br />
            <span className="text-blue-600">Like a Pro Investor</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant, comprehensive analysis of your pitch deck with AI-powered insights.
            Improve your chances of securing funding with detailed scoring and actionable feedback.
          </p>
          <Badge variant="secondary" className="mb-12 bg-blue-50 text-blue-700 border-blue-200">
            Trusted by 500+ startups
          </Badge>

          {/* Main Upload Section */}
          <div className="max-w-2xl mx-auto">
            <UploadSection />
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Investor-grade analysis</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Content Analysis</h3>
              <p className="text-gray-600 text-sm">Deep dive into your business model, market size, and competitive positioning</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Opportunity</h3>
              <p className="text-gray-600 text-sm">Evaluate market size, growth potential, and competitive landscape</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get comprehensive analysis in minutes, not days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Features */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Comprehensive scoring across 6 key metrics
              </h2>
              <p className="text-gray-600 mb-8">
                Our AI analyzes every aspect of your pitch deck using the same criteria that professional investors use to evaluate startups.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Content clarity and problem-solution fit</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Market opportunity assessment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Business model validation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Financial projections review</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Design quality and flow</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Storytelling coherence</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">76<span className="text-2xl text-gray-500">/100</span></div>
                <Badge className="bg-green-100 text-green-800">Good</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Content Clarity</span>
                  <span className="font-medium">82/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Market Opportunity</span>
                  <span className="font-medium">74/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '74%'}}></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Design Quality</span>
                  <span className="font-medium">85/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Features */}
      <section className="py-16 px-6 bg-yellow-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Share insights with your team
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you want to send a report to investors or collaborate with co-founders, PitchScore makes it easy to share your analysis.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Reports</h3>
              <p className="text-gray-600 text-sm">Send professional analysis reports directly to investors and advisors</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Team Sharing</h3>
              <p className="text-gray-600 text-sm">Collaborate with co-founders and team members on improvements</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">PDF Export</h3>
              <p className="text-gray-600 text-sm">Download professional reports for meetings and applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Founders love us. You will too.</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4 italic">
                "PitchScore helped us identify weak points in our deck before meeting investors. We raised $2M in our Series A."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Sarah Chen</div>
                <div className="text-gray-600">CEO, TechFlow</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4 italic">
                "The AI analysis was spot on. It gave us actionable feedback that we implemented immediately."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Marcus Rodriguez</div>
                <div className="text-gray-600">Founder, GreenStart</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4 italic">
                "Game-changer for early-stage founders. The scoring system is incredibly detailed and helpful."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Emily Zhang</div>
                <div className="text-gray-600">Co-founder, DataLens</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get your score?</h2>
          <p className="text-gray-300 mb-8">
            Join 500+ startups who have improved their pitch decks with AI-powered analysis.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-5 w-5" />
            Analyze Your Deck
          </Button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">PitchScore</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 PitchScore. Helping startups get investor-ready.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
