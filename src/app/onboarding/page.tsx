"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Upload, User, Palette, ShoppingCart, Package, Globe, BarChart3, MessageSquare } from "lucide-react"

interface ArtistIntakeData {
  // Section 1: Artist Profile & Brand Setup
  fullName: string
  studioName: string
  email: string
  phone: string
  location: string
  businessNumber: string
  gstNumber: string
  artistBio: string
  artistStatement: string
  logo: string
  brandColors: string
  typography: string
  tagline: string
  socialMedia: {
    instagram: string
    facebook: string
    tiktok: string
    pinterest: string
    youtube: string
    other: string
  }
  headshot: string
  domainName: string
  artisticStyle: string
  admiredArtists: string
  fontPreferences: string
  brandGuides: string
  colorPalette: string
  needsBrandGuide: boolean
  websiteReferences: string
  designFeatures: string
  designStyle: string
  designElements: string

  // Section 2: Artwork Catalog & Files
  artworkCatalog: Array<{
    title: string
    yearCreated: string
    medium: string
    description: string
    orientation: string
    keywords: string
  }>
  filePreparation: string
  assistanceNeeded: string[]
  fileFormatGuidance: boolean
  uploadMethod: string

  // Section 3: Product Types & Variants
  productTypes: string[]
  printSizes: {
    small: string
    medium: string
    large: string
    custom: string
  }
  unitSystem: string
  aspectRatios: string
  framingOptions: {
    colors: string
    materials: string
    matting: string
    glazing: string
    mounting: string
    depth: string
  }
  printMedia: string[]

  // Section 4: Pricing & Markup
  pricingModel: string
  markupPercentage: string
  limitedEditions: boolean
  wholesalePricing: boolean

  // Section 5: Shipping & Packaging
  shippingModel: string
  locationsServed: string[]
  standardTurnaround: string
  expressOptions: string
  signatureRequired: boolean
  packagingPreferences: string[]

  // Section 6: Website Structure & Marketing
  websitePages: string[]
  emailMarketing: boolean
  blogUpdates: boolean
  analyticsId: string
  promotionStrategy: string

  // Section 7: Order Management & Communication
  orderNotifications: string
  customerSupport: string
  returnProcess: string
  businessRegistrationName: string
  includeRetailPricing: boolean

  // Section 8: Marketing & Promotion History
  existingEmailList: boolean
  subscriberCount: string
  emailPlatform: string
  communicationFrequency: string
  pressFeatures: string
  exhibitions: string
  retailLocations: string
  licensingCollaborations: string
  marketingCollaboration: string
  artworkUsePermissions: string

  // Form state
  currentSection: number
  completedSections: number[]
  status: string
  submissionAgreement: boolean
}

export default function ArtistIntakePage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState<ArtistIntakeData>({
    // Initialize all fields with empty values
    fullName: '',
    studioName: '',
    email: '',
    phone: '',
    location: '',
    businessNumber: '',
    gstNumber: '',
    artistBio: '',
    artistStatement: '',
    logo: '',
    brandColors: '',
    typography: '',
    tagline: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      tiktok: '',
      pinterest: '',
      youtube: '',
      other: ''
    },
    headshot: '',
    domainName: '',
    artisticStyle: '',
    admiredArtists: '',
    fontPreferences: '',
    brandGuides: '',
    colorPalette: '',
    needsBrandGuide: false,
    websiteReferences: '',
    designFeatures: '',
    designStyle: '',
    designElements: '',
    artworkCatalog: [],
    filePreparation: '',
    assistanceNeeded: [],
    fileFormatGuidance: false,
    uploadMethod: '',
    productTypes: [],
    printSizes: {
      small: '',
      medium: '',
      large: '',
      custom: ''
    },
    unitSystem: '',
    aspectRatios: '',
    framingOptions: {
      colors: '',
      materials: '',
      matting: '',
      glazing: '',
      mounting: '',
      depth: ''
    },
    printMedia: [],
    pricingModel: '',
    markupPercentage: '',
    limitedEditions: false,
    wholesalePricing: false,
    shippingModel: '',
    locationsServed: [],
    standardTurnaround: '',
    expressOptions: '',
    signatureRequired: false,
    packagingPreferences: [],
    websitePages: [],
    emailMarketing: false,
    blogUpdates: false,
    analyticsId: '',
    promotionStrategy: '',
    orderNotifications: '',
    customerSupport: '',
    returnProcess: '',
    businessRegistrationName: '',
    includeRetailPricing: false,
    existingEmailList: false,
    subscriberCount: '',
    emailPlatform: '',
    communicationFrequency: '',
    pressFeatures: '',
    exhibitions: '',
    retailLocations: '',
    licensingCollaborations: '',
    marketingCollaboration: '',
    artworkUsePermissions: '',
    currentSection: 1,
    completedSections: [],
    status: 'draft',
    submissionAgreement: false
  })

  const [isLoading, setIsLoading] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const toggleArrayField = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[]
      const updatedArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      
      return {
        ...prev,
        [field]: updatedArray
      }
    })
  }

  const goToSection = (section: number) => {
    setCurrentSection(section)
  }

  const nextSection = () => {
    if (currentSection < 8) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  const saveProgress = async () => {
    setIsLoading(true)
    try {
      // Save to database as draft
      const response = await fetch('/api/artist-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'draft',
          currentSection
        }),
      })

      if (response.ok) {
        console.log('Progress saved')
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitIntake = async () => {
    if (!formData.submissionAgreement) {
      alert('Please agree to the submission terms before submitting.')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/artist-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'submitted',
          submittedAt: new Date().toISOString()
        }),
      })

      if (response.ok) {
        alert('🎉 Artist intake submitted successfully! We will begin building your website.')
        window.location.href = '/admin'
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting intake:', error)
      alert('Error submitting intake. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const sectionTitles = [
    "Artist Profile & Brand Setup",
    "Artwork Catalog & Files",
    "Product Types & Variants", 
    "Pricing & Markup",
    "Shipping & Packaging",
    "Website Structure & Marketing",
    "Order Management & Communication",
    "Marketing & Promotion History"
  ]

  const sectionIcons = [
    <User className="w-5 h-5" />,
    <Palette className="w-5 h-5" />,
    <ShoppingCart className="w-5 h-5" />,
    <BarChart3 className="w-5 h-5" />,
    <Package className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
    <MessageSquare className="w-5 h-5" />,
    <Upload className="w-5 h-5" />
  ]

  const progressPercentage = (currentSection / 8) * 100

  const renderSection1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submission Agreement</CardTitle>
          <CardDescription>
            Please read and acknowledge the submission terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Checkbox
              id="agreement"
              checked={formData.submissionAgreement}
              onCheckedChange={(checked) => updateFormData('submissionAgreement', checked)}
            />
            <Label htmlFor="agreement" className="text-sm leading-relaxed">
              I understand that once submitted, changes must be requested and approved. 
              Artists can save their submission as a draft and return to edit before final submission.
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Artist Information</CardTitle>
          <CardDescription>Basic contact and business information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name / Studio Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="Your full name or studio name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location (City/Region)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="City, State/Province"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessNumber">Business Number (if applicable)</Label>
              <Input
                id="businessNumber"
                value={formData.businessNumber}
                onChange={(e) => updateFormData('businessNumber', e.target.value)}
                placeholder="Business registration number"
              />
            </div>
            <div>
              <Label htmlFor="gstNumber">GST Number (if applicable)</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={(e) => updateFormData('gstNumber', e.target.value)}
                placeholder="GST/HST number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Identity</CardTitle>
          <CardDescription>Tell us about your artistic brand and identity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="artistBio">Artist Bio / Statement *</Label>
            <Textarea
              id="artistBio"
              value={formData.artistBio}
              onChange={(e) => updateFormData('artistBio', e.target.value)}
              placeholder="Describe your artistic background, inspiration, and journey..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="tagline">Tagline or Motto</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => updateFormData('tagline', e.target.value)}
              placeholder="A memorable phrase that represents your art"
            />
          </div>

          <div>
            <Label htmlFor="brandColors">Preferred Brand Colors / Typography</Label>
            <Input
              id="brandColors"
              value={formData.brandColors}
              onChange={(e) => updateFormData('brandColors', e.target.value)}
              placeholder="e.g., Navy blue, gold, modern sans-serif fonts"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.socialMedia.instagram}
                onChange={(e) => updateNestedFormData('socialMedia', 'instagram', e.target.value)}
                placeholder="@yourusername"
              />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.socialMedia.facebook}
                onChange={(e) => updateNestedFormData('socialMedia', 'facebook', e.target.value)}
                placeholder="facebook.com/yourpage"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="domainName">Domain Name (if owned)</Label>
            <Input
              id="domainName"
              value={formData.domainName}
              onChange={(e) => updateFormData('domainName', e.target.value)}
              placeholder="yourartistwebsite.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Style & Voice</CardTitle>
          <CardDescription>Help us understand your artistic style and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="artisticStyle">Describe your artistic style in a few words</Label>
            <Input
              id="artisticStyle"
              value={formData.artisticStyle}
              onChange={(e) => updateFormData('artisticStyle', e.target.value)}
              placeholder="e.g., Contemporary abstract, Traditional landscapes, Modern portraiture"
            />
          </div>

          <div>
            <Label htmlFor="admiredArtists">Other artist websites or brands you admire</Label>
            <Textarea
              id="admiredArtists"
              value={formData.admiredArtists}
              onChange={(e) => updateFormData('admiredArtists', e.target.value)}
              placeholder="List artists or brands whose style you admire and why..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="fontPreferences">Preferred font styles</Label>
            <Input
              id="fontPreferences"
              value={formData.fontPreferences}
              onChange={(e) => updateFormData('fontPreferences', e.target.value)}
              placeholder="e.g., modern sans-serif, serif, handwritten, script"
            />
          </div>

          <div>
            <Label htmlFor="colorPalette">Preferred color palette</Label>
            <Input
              id="colorPalette"
              value={formData.colorPalette}
              onChange={(e) => updateFormData('colorPalette', e.target.value)}
              placeholder="List HEX or RGB codes if known, or describe colors"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="needsBrandGuide"
              checked={formData.needsBrandGuide}
              onCheckedChange={(checked) => updateFormData('needsBrandGuide', checked)}
            />
            <Label htmlFor="needsBrandGuide">
              Would you like help creating a cohesive brand style guide?
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Website Design References</CardTitle>
          <CardDescription>Share your design preferences and inspiration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="websiteReferences">List 2–3 websites whose layout, design, or navigation you like</Label>
            <Textarea
              id="websiteReferences"
              value={formData.websiteReferences}
              onChange={(e) => updateFormData('websiteReferences', e.target.value)}
              placeholder="List website URLs and what you like about them..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="designFeatures">What features or pages stood out to you?</Label>
            <Textarea
              id="designFeatures"
              value={formData.designFeatures}
              onChange={(e) => updateFormData('designFeatures', e.target.value)}
              placeholder="Describe specific features you found appealing..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="designStyle">Design feel preference</Label>
            <Input
              id="designStyle"
              value={formData.designStyle}
              onChange={(e) => updateFormData('designStyle', e.target.value)}
              placeholder="e.g., minimalist, bold, artistic, editorial, commercial"
            />
          </div>

          <div>
            <Label htmlFor="designElements">Any must-have design elements</Label>
            <Input
              id="designElements"
              value={formData.designElements}
              onChange={(e) => updateFormData('designElements', e.target.value)}
              placeholder="e.g., parallax scroll, animation, video banners"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            🎨 Artist Onboarding & Website Builder
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Complete intake form for your custom artist website
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Section {currentSection} of 8</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Section Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Intake Sections</CardTitle>
            <CardDescription>
              Complete all sections to provide everything needed for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sectionTitles.map((title, index) => {
                const sectionNum = index + 1
                const isCurrent = currentSection === sectionNum
                
                return (
                  <button
                    key={sectionNum}
                    onClick={() => goToSection(sectionNum)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      isCurrent 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {sectionIcons[index]}
                      <Badge variant={isCurrent ? "default" : "outline"} className="text-xs">
                        {sectionNum}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium leading-tight">{title}</p>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Section Content */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {sectionIcons[currentSection - 1]}
            <div>
              <h2 className="text-2xl font-semibold">{sectionTitles[currentSection - 1]}</h2>
              <p className="text-muted-foreground">Section {currentSection} of 8</p>
            </div>
          </div>

          {currentSection === 1 && renderSection1()}
          {currentSection === 2 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 2: Artwork Catalog & Files - Coming Soon</p>
              </CardContent>
            </Card>
          )}
          {currentSection === 3 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 3: Product Types & Variants - Coming Soon</p>
              </CardContent>
            </Card>
          )}
          {currentSection === 4 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 4: Pricing & Markup - Coming Soon</p>
              </CardContent>
            </Card>
          )}
          {currentSection === 5 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 5: Shipping & Packaging - Coming Soon</p>
              </CardContent>
            </Card>
          )}
          {currentSection === 6 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 6: Website Structure & Marketing - Coming Soon</p>
              </CardContent>
            </Card>
          )}
          {currentSection === 7 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 7: Order Management & Communication - Coming Soon</p>
              </CardContent>
            </Card>
          )}
          {currentSection === 8 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Section 8: Marketing & Promotion History - Coming Soon</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center p-4 border-t bg-muted/30 rounded-lg">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentSection === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={saveProgress} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Draft'}
            </Button>
            
            {currentSection === 8 ? (
              <Button onClick={submitIntake} disabled={isLoading || !formData.submissionAgreement}>
                {isLoading ? 'Submitting...' : 'Submit Intake'}
              </Button>
            ) : (
              <Button onClick={nextSection} className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
