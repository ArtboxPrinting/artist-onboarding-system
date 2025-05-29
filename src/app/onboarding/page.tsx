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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Upload, User, Palette, ShoppingCart, Package, Globe, BarChart3, MessageSquare, Plus, Trash2 } from "lucide-react"

interface ArtworkItem {
  title: string
  yearCreated: string
  medium: string
  description: string
  orientation: string
  keywords: string
}

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
  artworkCatalog: ArtworkItem[]
  filePreparation: string
  assistanceNeeded: string[]
  fileFormatGuidance: boolean
  uploadMethod: string

  // Placeholder sections 3-8
  productTypes: string[]
  printSizes: { small: string; medium: string; large: string; custom: string }
  unitSystem: string
  aspectRatios: string
  framingOptions: { colors: string; materials: string; matting: string; glazing: string; mounting: string; depth: string }
  printMedia: string[]
  pricingModel: string
  markupPercentage: string
  limitedEditions: boolean
  wholesalePricing: boolean
  shippingModel: string
  locationsServed: string[]
  standardTurnaround: string
  expressOptions: string
  signatureRequired: boolean
  packagingPreferences: string[]
  websitePages: string[]
  emailMarketing: boolean
  blogUpdates: boolean
  analyticsId: string
  promotionStrategy: string
  orderNotifications: string
  customerSupport: string
  returnProcess: string
  businessRegistrationName: string
  includeRetailPricing: boolean
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
  id?: string
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
    printSizes: { small: '', medium: '', large: '', custom: '' },
    unitSystem: '',
    aspectRatios: '',
    framingOptions: { colors: '', materials: '', matting: '', glazing: '', mounting: '', depth: '' },
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

  const addArtworkItem = () => {
    const newArtwork: ArtworkItem = {
      title: '',
      yearCreated: '',
      medium: '',
      description: '',
      orientation: '',
      keywords: ''
    }
    setFormData(prev => ({
      ...prev,
      artworkCatalog: [...prev.artworkCatalog, newArtwork]
    }))
  }

  const updateArtworkItem = (index: number, field: keyof ArtworkItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      artworkCatalog: prev.artworkCatalog.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const removeArtworkItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      artworkCatalog: prev.artworkCatalog.filter((_, i) => i !== index)
    }))
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
        const result = await response.json()
        console.log('Progress saved successfully:', result)
        // Update form data with the ID if it was generated
        if (result.data?.id && !formData.id) {
          setFormData(prev => ({ ...prev, id: result.data.id }))
        }
        alert('✅ Progress saved successfully!')
      } else {
        throw new Error('Failed to save progress')
      }
    } catch (error) {
      console.error('Error saving progress:', error)
      alert('❌ Error saving progress. Please try again.')
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

  const renderSection2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Artwork Catalog</CardTitle>
          <CardDescription>
            Add details for each artwork you want to offer on your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.artworkCatalog.map((artwork, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Artwork #{index + 1}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArtworkItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`title-${index}`}>Title *</Label>
                  <Input
                    id={`title-${index}`}
                    value={artwork.title}
                    onChange={(e) => updateArtworkItem(index, 'title', e.target.value)}
                    placeholder="Artwork title"
                  />
                </div>
                <div>
                  <Label htmlFor={`year-${index}`}>Year Created</Label>
                  <Input
                    id={`year-${index}`}
                    value={artwork.yearCreated}
                    onChange={(e) => updateArtworkItem(index, 'yearCreated', e.target.value)}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`medium-${index}`}>Medium</Label>
                  <Input
                    id={`medium-${index}`}
                    value={artwork.medium}
                    onChange={(e) => updateArtworkItem(index, 'medium', e.target.value)}
                    placeholder="e.g., Oil on canvas, Digital art, Watercolor"
                  />
                </div>
                <div>
                  <Label htmlFor={`orientation-${index}`}>Orientation</Label>
                  <Select
                    value={artwork.orientation}
                    onValueChange={(value) => updateArtworkItem(index, 'orientation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={artwork.description}
                  onChange={(e) => updateArtworkItem(index, 'description', e.target.value)}
                  placeholder="Describe the artwork, inspiration, technique, etc."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor={`keywords-${index}`}>Keywords for SEO</Label>
                <Input
                  id={`keywords-${index}`}
                  value={artwork.keywords}
                  onChange={(e) => updateArtworkItem(index, 'keywords', e.target.value)}
                  placeholder="abstract, colorful, modern, nature, landscape"
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addArtworkItem}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Artwork
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Preparation</CardTitle>
          <CardDescription>Tell us about your artwork files and any assistance needed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>How will you provide your artwork files?</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="files-ready"
                  checked={formData.filePreparation === 'ready'}
                  onCheckedChange={(checked) => updateFormData('filePreparation', checked ? 'ready' : '')}
                />
                <Label htmlFor="files-ready">I have high-resolution files ready</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="files-help"
                  checked={formData.filePreparation === 'help'}
                  onCheckedChange={(checked) => updateFormData('filePreparation', checked ? 'help' : '')}
                />
                <Label htmlFor="files-help">I need help preparing some files</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="files-create"
                  checked={formData.filePreparation === 'create'}
                  onCheckedChange={(checked) => updateFormData('filePreparation', checked ? 'create' : '')}
                />
                <Label htmlFor="files-create">I need help creating print files from originals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="files-physical"
                  checked={formData.filePreparation === 'physical'}
                  onCheckedChange={(checked) => updateFormData('filePreparation', checked ? 'physical' : '')}
                />
                <Label htmlFor="files-physical">I only have physical originals</Label>
              </div>
            </div>
          </div>

          <div>
            <Label>Do you need assistance with the following? (additional service fees may apply)</Label>
            <div className="space-y-2 mt-2">
              {[
                'Cropping and aspect ratio adjustments',
                'Color correction / consistency',
                'Scanning / photographing originals',
                'Adding borders / signature area',
                'Organizing and renaming files'
              ].map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`assistance-${service}`}
                    checked={formData.assistanceNeeded.includes(service)}
                    onCheckedChange={() => toggleArrayField('assistanceNeeded', service)}
                  />
                  <Label htmlFor={`assistance-${service}`}>{service}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="fileFormatGuidance"
              checked={formData.fileFormatGuidance}
              onCheckedChange={(checked) => updateFormData('fileFormatGuidance', checked)}
            />
            <Label htmlFor="fileFormatGuidance">
              I need help understanding resolution or color specs
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Format Guidance</CardTitle>
          <CardDescription>Technical specifications for your artwork files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Recommended File Specifications:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Resolution:</strong> 300 DPI minimum</li>
              <li>• <strong>Formats:</strong> JPG, PNG, TIFF</li>
              <li>• <strong>Color Profiles:</strong> sRGB or Adobe RGB</li>
            </ul>
          </div>

          <div>
            <Label htmlFor="uploadMethod">Preferred method for uploading new artwork</Label>
            <Select
              value={formData.uploadMethod}
              onValueChange={(value) => updateFormData('uploadMethod', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select upload method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-drive">Google Drive</SelectItem>
                <SelectItem value="dropbox">Dropbox</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="dashboard">Artist dashboard (if available)</SelectItem>
              </SelectContent>
            </Select>
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
          {currentSection === 2 && renderSection2()}
          {[3, 4, 5, 6, 7, 8].includes(currentSection) && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Section {currentSection}: {sectionTitles[currentSection - 1]} - Coming Soon
                </p>
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

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Debug Info (Development Only)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1">
                <p><strong>Current Section:</strong> {currentSection}</p>
                <p><strong>Artwork Count:</strong> {formData.artworkCatalog.length}</p>
                <p><strong>Form ID:</strong> {formData.id || 'Not assigned yet'}</p>
                <p><strong>Assistance Needed:</strong> {formData.assistanceNeeded.join(', ') || 'None'}</p>
                <p><strong>File Preparation:</strong> {formData.filePreparation || 'Not selected'}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
