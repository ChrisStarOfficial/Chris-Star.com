"use client"

import type React from "react"
import { useState } from "react"
import { Star, Send, X, Video, Users } from "lucide-react"
import Button from "@/components/ui/forms/Button"
import GlassOverlay, { GlassPanel } from "@/app/feedback/components/FeedbackOverlay"
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"

type FeedbackType = 'video' | 'community' | null

export default function FeedbackPage() {
  const [selectedType, setSelectedType] = useState<FeedbackType>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    productName: "",
    reviewTitle: "",
    reviewText: "",
    pros: "",
    cons: "",
    wouldRecommend: null as boolean | null,
    reviewerName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call - in real app, send selectedType along with formData
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Submitting feedback:', {
      type: selectedType,
      ...formData,
      rating
    })

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setSelectedType(null)
    setSubmitted(false)
    setFormData({
      productName: "",
      reviewTitle: "",
      reviewText: "",
      pros: "",
      cons: "",
      wouldRecommend: null,
      reviewerName: "",
      email: "",
    })
    setRating(0)
  }

  const openForm = (type: FeedbackType) => {
    setSelectedType(type)
    // Pre-fill the product name based on selection
    setFormData(prev => ({
      ...prev,
      productName: type === 'video' ? 'Video Content' : 'Community'
    }))
  }

  // If form is open, show the full-screen glass overlay with form
  if (selectedType) {
    if (submitted) {
      return (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <GlassOverlay>
              <GlassPanel>
                <button
                  onClick={resetForm}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-6">
                  <div className="text-6xl">🎉</div>
                  <h2 className="text-2xl font-medium text-white">Thank You!</h2>
                  <p className="text-white/80">
                    Your {selectedType} feedback has been submitted successfully. We appreciate your feedback! 💝
                  </p>
                  <Button
                    onClick={() => window.open("https://www.youtube.com/@diecastbydollar", "_blank")}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white transition-all duration-700 ease-out hover:scale-[1.02]"
                  >
                    Subscribe on YouTube 📺
                  </Button>
                </div>
              </GlassPanel>
            </GlassOverlay>
          </main>
          <Footer />
        </div>
      )
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <GlassOverlay>
            <GlassPanel>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-medium text-white mb-2">
                    {selectedType === 'video' ? 'Video' : 'Community'} Feedback
                  </h1>
                  <p className="text-white/60 text-sm">
                    Share your experience to help us create the best {selectedType} content possible.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Product Name - Auto-filled but editable */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Feedback is for</label>
                      <input
                        type="text"
                        required
                        value={formData.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
                        placeholder={selectedType === 'video' ? "Specific video or general content" : "Community aspect"}
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Overall Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-all duration-200 hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-white/40"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pros */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Areas of Excellence</label>
                      <textarea
                        rows={4}
                        value={formData.pros}
                        onChange={(e) => handleInputChange("pros", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="What did you like?"
                      />
                    </div>

                    {/* Reviewer Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.reviewerName}
                        onChange={(e) => handleInputChange("reviewerName", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Review Text */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Your Feedback</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.reviewText}
                        onChange={(e) => handleInputChange("reviewText", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                        placeholder={
                          selectedType === 'video' 
                            ? "Tell us about the video content, production quality, entertainment value..."
                            : "Share your thoughts about the community, engagement, support..."
                        }
                      />
                    </div>

                    {/* Cons */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Areas of Improvement</label>
                      <textarea
                        rows={4}
                        value={formData.cons}
                        onChange={(e) => handleInputChange("cons", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="What could be better?"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Would Recommend */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-3">
                        Would you recommend this to others?
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => handleInputChange("wouldRecommend", true)}
                          className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-300 ${
                            formData.wouldRecommend === true
                              ? "bg-white/20 border-white/40 text-white"
                              : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          Yes 🫡
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange("wouldRecommend", false)}
                          className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-300 ${
                            formData.wouldRecommend === false
                              ? "bg-white/20 border-white/40 text-white"
                              : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          No 🙅
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Full Width */}
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white transition-all duration-700 ease-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2" />
                      Submitting {selectedType} Feedback... ⏳
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit {selectedType === 'video' ? 'Video' : 'Community'} Feedback
                    </>
                  )}
                </Button>
              </form>
            </GlassPanel>
          </GlassOverlay>
        </main>
        <Footer />
      </div>
    )
  }

  // Main page with clickable cards (normal layout)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <GlassOverlay>
          <GlassPanel width="600px" maxWidth="90vw">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-medium text-white mb-4">Provide feedback on...</h1>
              <p className="text-white/60 text-m">Your feedback helps us improve and create better experiences for everyone</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video Feedback Card */}
              <button
                onClick={() => openForm('video')}
                className="group p-8 backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl text-white transition-all duration-500 ease-out hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-300">
                    <Video className="w-12 h-12 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-medium">Video Content</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Share your thoughts on our videos, content quality, production value, and entertainment factor
                  </p>
                  <div className="text-blue-300 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Provide Feedback →
                  </div>
                </div>
              </button>

              {/* Community Feedback Card */}
              <button
                onClick={() => openForm('community')}
                className="group p-8 backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl text-white transition-all duration-500 ease-out hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-green-500/20 group-hover:bg-green-500/30 transition-all duration-300">
                    <Users className="w-12 h-12 text-green-300" />
                  </div>
                  <h3 className="text-xl font-medium">Community</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Feedback on our community engagement, support quality, interactions, and overall community experience
                  </p>
                  <div className="text-green-300 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Provide Feedback →
                  </div>
                </div>
              </button>
            </div>
          </GlassPanel>
        </GlassOverlay>
      </main>
      <Footer />
    </div>
  )
}