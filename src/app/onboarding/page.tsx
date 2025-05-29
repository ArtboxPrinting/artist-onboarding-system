"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, User } from "lucide-react"

// Import the section components
import Section1ArtistProfile from "@/components/onboarding/Section1ArtistProfile"
import Section2ArtworkCatalog from "@/components/onboarding/Section2ArtworkCatalog"
import Section3ProductConfig from "@/components/onboarding/Section3ProductConfig"
import Section4Pricing from "@/components/onboarding/Section4Pricing"

interface ArtistData {
  id?: string
  firstName: string
  lastName: string
  email: string
  section1Data?: any
  section2Data?: any
  section3Data?: any
  section4Data?: any
  currentSection: number
  status: 'draft' | 'in-progress' | 'completed'
  completedSections: number[]
}

export default function OnboardingPage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [artistData, setArtistData] = useState<ArtistData>({
    firstName: '',
    lastName: '',
    email: '',
    currentSection: 1,
    status: 'draft',
    completedSections: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [artistId, setArtistId] = useState<string>()

  // Generate artist initials
  const getArtistInitials = () => {
    if (artistData.firstName && artistData.lastName) {
      return `${artistData.firstName[0]}${artistData.lastName[0]}`.toUpperCase()
    }
    return ""
  }

  // Save progress to API
  const saveProgress = async () => {
    if (!artistId) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistId,
          sectionNumber: currentSection,
          formData: getCurrentSectionData(),
          status: artistData.status
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save progress')
      }

      console.log('Progress saved successfully')
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get current section data
  const getCurrentSectionData = () => {
    switch (currentSection) {
      case 1: return artistData.section1Data
      case 2: return artistData.section2Data
      case 3: return artistData.section3Data
      case 4: return artistData.section4Data
      default: return {}
    }
  }

  // Update section data
  const updateSectionData = (sectionNum: number, data: any) => {
    setArtistData(prev => ({
      ...prev,
      [`section${sectionNum}Data`]: data,
      // Update basic info from section 1
      ...(sectionNum === 1 && {
        firstName: data.firstName || prev.firstName,
        lastName: data.lastName || prev.lastName,
        email: data.email || prev.email
      })
    }))
  }

  // Handle section completion
  const handleSectionComplete = async (sectionId: number) => {
    const updatedCompletedSections = [...artistData.completedSections]
    if (!updatedCompletedSections.includes(sectionId)) {
      updatedCompletedSections.push(sectionId)
    }

    setArtistData(prev => ({
      ...prev,
      completedSections: updatedCompletedSections,
      currentSection: Math.min(sectionId + 1, 4),
      status: sectionId === 4 ? 'completed' : 'in-progress'
    }))

    // Save progress after completion
    await saveProgress()

    // Move to next section if not the last one
    if (sectionId < 4) {
      setCurrentSection(sectionId + 1)
    } else {
      // Complete onboarding
      await completeOnboarding()
    }
  }

  // Complete the entire onboarding process
  const completeOnboarding = async () => {
    if (!artistId) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistId,
          sectionData: {
            section1: artistData.section1Data,
            section2: artistData.section2Data,
            section3: artistData.section3Data,
            section4: artistData.section4Data
          }
        }),
      })

      if (response.ok) {
        alert('🎉 Onboarding completed successfully! Welcome to the artist platform!')
        // Redirect to dashboard or success page
        window.location.href = '/admin'
      } else {
        throw new Error('Failed to complete onboarding')
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
      alert('There was an error completing your onboarding. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize new artist on component mount
  useEffect(() => {
    const initializeArtist = async () => {
      // Generate a unique artist ID
      const newArtistId = `artist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setArtistId(newArtistId)
    }

    initializeArtist()
  }, [])

  // Navigation functions
  const goToSection = (sectionNum: number) => {
    setCurrentSection(sectionNum)
  }

  const goToPreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  // Calculate progress percentage
  const progressPercentage = (artistData.completedSections.length / 4) * 100

  // Section titles
  const sectionTitles = [
    "Artist Profile & Brand Setup",
    "Artwork Catalog & File Management", 
    "Product Configuration & Variants",
    "Pricing Strategy & Setup"
  ]

  const renderCurrentSection = () => {
    const commonProps = {
      artistId,
      artistInitials: getArtistInitials(),
      onSaveProgress: saveProgress
    }

    switch (currentSection) {
      case 1:
        return (
          <Section1ArtistProfile
            {...commonProps}
            onSectionComplete={handleSectionComplete}
            initialData={artistData.section1Data}
            updateSectionData={(data) => updateSectionData(1, data)}
          />
        )
      case 2:
        return (
          <Section2ArtworkCatalog
            {...commonProps}
            onSectionComplete={handleSectionComplete}
            initialData={artistData.section2Data}
            updateSectionData={(data) => updateSectionData(2, data)}
          />
        )
      case 3:
        return (
          <Section3ProductConfig
            {...commonProps}
            onSectionComplete={handleSectionComplete}
            initialData={artistData.section3Data}
            updateSectionData={(data) => updateSectionData(3, data)}
          />
        )
      case 4:
        return (
          <Section4Pricing
            {...commonProps}
            onSectionComplete={handleSectionComplete}
            initialData={artistData.section4Data}
            updateSectionData={(data) => updateSectionData(4, data)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Artist Onboarding System
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Complete your artist profile to join our platform
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{artistData.completedSections.length} of 4 sections complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Section Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Onboarding Sections</CardTitle>
            <CardDescription>
              Complete all sections to activate your artist profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sectionTitles.map((title, index) => {
                const sectionNum = index + 1
                const isCompleted = artistData.completedSections.includes(sectionNum)
                const isCurrent = currentSection === sectionNum
                
                return (
                  <button
                    key={sectionNum}
                    onClick={() => goToSection(sectionNum)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      isCurrent 
                        ? "border-primary bg-primary/5" 
                        : isCompleted
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted 
                          ? "bg-green-500 text-white" 
                          : isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : sectionNum}
                      </div>
                      <Badge variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"} className="text-xs">
                        {isCompleted ? "Complete" : isCurrent ? "Current" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{title}</p>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Section Content */}
        <div className="mb-8">
          {renderCurrentSection()}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center p-4 border-t bg-muted/30 rounded-lg">
          <Button
            variant="outline"
            onClick={goToPreviousSection}
            disabled={currentSection === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Section
          </Button>

          <div className="flex items-center gap-2">
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 animate-spin" />
                Saving...
              </div>
            )}
            <Badge variant="outline">
              Section {currentSection} of 4
            </Badge>
          </div>

          <Button
            onClick={() => currentSection < 4 ? setCurrentSection(currentSection + 1) : completeOnboarding()}
            disabled={currentSection === 4 && artistData.completedSections.length < 4}
            className="flex items-center gap-2"
          >
            {currentSection === 4 ? "Complete Onboarding" : "Next Section"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Test Artist Info Display */}
        {(artistData.firstName || artistData.lastName || artistData.email) && (
          <Card className="mt-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-sm text-green-800">Test Artist Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong> {artistData.firstName} {artistData.lastName}</p>
                <p><strong>Email:</strong> {artistData.email}</p>
                <p><strong>Artist ID:</strong> {artistId}</p>
                <p><strong>Progress:</strong> {artistData.completedSections.length}/4 sections completed</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
