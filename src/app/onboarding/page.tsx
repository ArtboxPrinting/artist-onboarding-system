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

  // Section 3: Product Types & Variants
  productTypes: string[]
  printSizes: { small: string; medium: string; large: string; custom: string }
  unitSystem: string
  aspectRatios: string
  framingOptions: { colors: string; materials: string; matting: string; glazing: string; mounting: string; depth: string }
  printMedia: string[]

  // Section 4: Pricing & Markup
  pricingModel: string
  markupPercentage: string
  specificPrices: { small: string; medium: string; large: string; framed: string; canvas: string; merchandise: string }
  limitedEditions: boolean
  limitedEditionDetails: string
  signedPrints: boolean
  signedPrintPremium: string
  wholesalePricing: boolean
  wholesaleDiscount: string

  // Section 5: Shipping & Packaging
  shippingModel: string
  locationsServed: string[]
  standardTurnaround: string
  expressOptions: string
  expressUpcharge: string
  signatureRequired: boolean
  packagingPreferences: string[]
  brandedInserts: boolean
  certificateAuthenticity: boolean
  giftPackaging: boolean
  packagingNotes: string

  // Section 6: Website Structure & Marketing
  websitePages: string[]
  emailMarketing: boolean
  blogUpdates: boolean
  analyticsId: string
  promotionStrategy: string

  // Placeholder sections 7-8
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
    specificPrices: { small: '', medium: '', large: '', framed: '', canvas: '', merchandise: '' },
    limitedEditions: false,
    limitedEditionDetails: '',
    signedPrints: false,
    signedPrintPremium: '',
    wholesalePricing: false,
    wholesaleDiscount: '',
    shippingModel: '',
    locationsServed: [],
    standardTurnaround: '',
    expressOptions: '',
    expressUpcharge: '',
    signatureRequired: false,
    packagingPreferences: [],
    brandedInserts: false,
    certificateAuthenticity: false,
    giftPackaging: false,
    packagingNotes: '',
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
    setFormData(prev => {
      const currentValue = prev[section as keyof typeof prev]
      
      // Only spread if the current value is an object and not an array
      if (currentValue && typeof currentValue === 'object' && !Array.isArray(currentValue)) {
        return {
          ...prev,
          [section]: {
            ...currentValue,
            [field]: value
          }
        }
      }
      
      // If not an object, create a new object
      return {
        ...prev,
        [section]: {
          [field]: value
        }
      }
    })
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

  const renderSection3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Types & Offerings</CardTitle>
          <CardDescription>
            What will you offer for each artwork?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select the product types you want to offer:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {[
                'Unframed prints',
                'Framed prints', 
                'Canvas wraps',
                'Block mounts',
                'Greeting cards / postcards',
                'Merchandise (mugs, magnets, etc.)',
                'Originals (manual fulfillment only)'
              ].map((product) => (
                <div key={product} className="flex items-center space-x-2">
                  <Checkbox
                    id={`product-${product}`}
                    checked={formData.productTypes.includes(product)}
                    onCheckedChange={() => toggleArrayField('productTypes', product)}
                  />
                  <Label htmlFor={`product-${product}`} className="text-sm">{product}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Print Sizes Offered</CardTitle>
          <CardDescription>Define the print sizes you want to offer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="unitSystem">Unit System</Label>
            <Select
              value={formData.unitSystem}
              onValueChange={(value) => updateFormData('unitSystem', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="cm">Centimeters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smallSize">Small Size</Label>
              <Input
                id="smallSize"
                value={formData.printSizes.small}
                onChange={(e) => updateNestedFormData('printSizes', 'small', e.target.value)}
                placeholder="e.g., 8x10 or 20x25cm"
              />
            </div>
            <div>
              <Label htmlFor="mediumSize">Medium Size</Label>
              <Input
                id="mediumSize"  
                value={formData.printSizes.medium}
                onChange={(e) => updateNestedFormData('printSizes', 'medium', e.target.value)}
                placeholder="e.g., 11x14 or 28x35cm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="largeSize">Large Size</Label>
              <Input
                id="largeSize"
                value={formData.printSizes.large}
                onChange={(e) => updateNestedFormData('printSizes', 'large', e.target.value)}
                placeholder="e.g., 16x20 or 40x50cm"
              />
            </div>
            <div>
              <Label htmlFor="customSize">Custom Sizes</Label>
              <Input
                id="customSize"
                value={formData.printSizes.custom}
                onChange={(e) => updateNestedFormData('printSizes', 'custom', e.target.value)}
                placeholder="e.g., Custom sizes available upon request"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="aspectRatios">Aspect ratios allowed</Label>
            <Input
              id="aspectRatios"
              value={formData.aspectRatios}
              onChange={(e) => updateFormData('aspectRatios', e.target.value)}
              placeholder="e.g., 4:5, 3:4, 16:20, square crops"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Framing Options</CardTitle>
          <CardDescription>Configure framing options (if offering framed prints)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="frameColors">Frame Colors</Label>
              <Input
                id="frameColors"
                value={formData.framingOptions.colors}
                onChange={(e) => updateNestedFormData('framingOptions', 'colors', e.target.value)}
                placeholder="e.g., Black, White, Natural Wood, Gold"
              />
            </div>
            <div>
              <Label htmlFor="frameMaterials">Frame Materials</Label>
              <Input
                id="frameMaterials"
                value={formData.framingOptions.materials}
                onChange={(e) => updateNestedFormData('framingOptions', 'materials', e.target.value)}
                placeholder="e.g., Wood, Metal, Plastic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="matting">Matting Options</Label>
              <Input
                id="matting"
                value={formData.framingOptions.matting}
                onChange={(e) => updateNestedFormData('framingOptions', 'matting', e.target.value)}
                placeholder="e.g., White, Cream, Black, No mat"
              />
            </div>
            <div>
              <Label htmlFor="glazing">Glazing</Label>
              <Select
                value={formData.framingOptions.glazing}
                onValueChange={(value) => updateNestedFormData('framingOptions', 'glazing', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select glazing option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="acrylic">Acrylic</SelectItem>
                  <SelectItem value="uv">UV Protection</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mounting">Mounting Style</Label>
              <Input
                id="mounting"
                value={formData.framingOptions.mounting}
                onChange={(e) => updateNestedFormData('framingOptions', 'mounting', e.target.value)}
                placeholder="e.g., Float mount, Standard mount"
              />
            </div>
            <div>
              <Label htmlFor="frameDepth">Frame Depth</Label>
              <Input
                id="frameDepth"
                value={formData.framingOptions.depth}
                onChange={(e) => updateNestedFormData('framingOptions', 'depth', e.target.value)}
                placeholder="e.g., 1 inch, 2 inches"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Print Media</CardTitle>
          <CardDescription>Select the print media/paper types you want to offer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'Satin Photo',
              'Fine Art Rag',
              'Textured Matte',
              'Canvas'
            ].map((media) => (
              <div key={media} className="flex items-center space-x-2">
                <Checkbox
                  id={`media-${media}`}
                  checked={formData.printMedia.includes(media)}
                  onCheckedChange={() => toggleArrayField('printMedia', media)}
                />
                <Label htmlFor={`media-${media}`} className="text-sm">{media}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSection4 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pricing Model</CardTitle>
          <CardDescription>
            How should we handle product pricing?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Pricing approach:</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="specific-prices"
                  checked={formData.pricingModel === 'specific'}
                  onCheckedChange={(checked) => updateFormData('pricingModel', checked ? 'specific' : '')}
                />
                <Label htmlFor="specific-prices">I will provide specific prices for each product type</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="markup-percentage"
                  checked={formData.pricingModel === 'markup'}
                  onCheckedChange={(checked) => updateFormData('pricingModel', checked ? 'markup' : '')}
                />
                <Label htmlFor="markup-percentage">Use a markup percentage based on base cost</Label>
              </div>
            </div>
          </div>

          {formData.pricingModel === 'markup' && (
            <div>
              <Label htmlFor="markupPercentage">Markup Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="markupPercentage"
                  type="number"
                  value={formData.markupPercentage}
                  onChange={(e) => updateFormData('markupPercentage', e.target.value)}
                  placeholder="150"
                  className="max-w-24"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                e.g., 150% markup means if base cost is $10, selling price will be $25
              </p>
            </div>
          )}

          {formData.pricingModel === 'specific' && (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Set specific prices for each product type. These will be used as starting prices for all artworks.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceSmall">Small Print Price</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="priceSmall"
                      type="number"
                      value={formData.specificPrices.small}
                      onChange={(e) => updateNestedFormData('specificPrices', 'small', e.target.value)}
                      placeholder="45.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="priceMedium">Medium Print Price</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="priceMedium"
                      type="number"
                      value={formData.specificPrices.medium}
                      onChange={(e) => updateNestedFormData('specificPrices', 'medium', e.target.value)}
                      placeholder="65.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceLarge">Large Print Price</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="priceLarge"
                      type="number"
                      value={formData.specificPrices.large}
                      onChange={(e) => updateNestedFormData('specificPrices', 'large', e.target.value)}
                      placeholder="85.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="priceFramed">Framed Print Premium</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">+$</span>
                    <Input
                      id="priceFramed"
                      type="number"
                      value={formData.specificPrices.framed}
                      onChange={(e) => updateNestedFormData('specificPrices', 'framed', e.target.value)}
                      placeholder="40.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceCanvas">Canvas Wrap Price</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="priceCanvas"
                      type="number"
                      value={formData.specificPrices.canvas}
                      onChange={(e) => updateNestedFormData('specificPrices', 'canvas', e.target.value)}
                      placeholder="95.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="priceMerchandise">Merchandise Base Price</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="priceMerchandise"
                      type="number"
                      value={formData.specificPrices.merchandise}
                      onChange={(e) => updateNestedFormData('specificPrices', 'merchandise', e.target.value)}
                      placeholder="25.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limited Editions & Special Offerings</CardTitle>
          <CardDescription>Configure special product offerings and pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitedEditions"
              checked={formData.limitedEditions}
              onCheckedChange={(checked) => updateFormData('limitedEditions', checked)}
            />
            <Label htmlFor="limitedEditions">
              Offer limited edition prints
            </Label>
          </div>

          {formData.limitedEditions && (
            <div>
              <Label htmlFor="limitedEditionDetails">Limited Edition Details</Label>
              <Textarea
                id="limitedEditionDetails"
                value={formData.limitedEditionDetails}
                onChange={(e) => updateFormData('limitedEditionDetails', e.target.value)}
                placeholder="e.g., Limited to 50 prints per artwork, numbered and certified"
                rows={2}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="signedPrints"
              checked={formData.signedPrints}
              onCheckedChange={(checked) => updateFormData('signedPrints', checked)}
            />
            <Label htmlFor="signedPrints">
              Offer signed prints with premium pricing
            </Label>
          </div>

          {formData.signedPrints && (
            <div>
              <Label htmlFor="signedPrintPremium">Signed Print Premium</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">+$</span>
                <Input
                  id="signedPrintPremium"
                  type="number"
                  value={formData.signedPrintPremium}
                  onChange={(e) => updateFormData('signedPrintPremium', e.target.value)}
                  placeholder="25.00"
                  step="0.01"
                  className="max-w-32"
                />
                <span className="text-sm text-muted-foreground">additional per signed print</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wholesale Pricing</CardTitle>
          <CardDescription>Configure wholesale pricing for bulk orders or retail partners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wholesalePricing"
              checked={formData.wholesalePricing}
              onCheckedChange={(checked) => updateFormData('wholesalePricing', checked)}
            />
            <Label htmlFor="wholesalePricing">
              Offer wholesale pricing
            </Label>
          </div>

          {formData.wholesalePricing && (
            <div>
              <Label htmlFor="wholesaleDiscount">Wholesale Discount</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="wholesaleDiscount"
                  type="number"
                  value={formData.wholesaleDiscount}
                  onChange={(e) => updateFormData('wholesaleDiscount', e.target.value)}
                  placeholder="30"
                  className="max-w-24"
                />
                <span className="text-sm text-muted-foreground">% off retail price</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Wholesale pricing will be automatically calculated and displayed to qualifying customers
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderSection5 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Setup</CardTitle>
          <CardDescription>
            Configure how shipping costs will be calculated and displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Preferred shipping model:</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-shipping"
                  checked={formData.shippingModel === 'free'}
                  onCheckedChange={(checked) => updateFormData('shippingModel', checked ? 'free' : '')}
                />
                <Label htmlFor="free-shipping">Free shipping (built into product prices)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flat-rate"
                  checked={formData.shippingModel === 'flat'}
                  onCheckedChange={(checked) => updateFormData('shippingModel', checked ? 'flat' : '')}
                />
                <Label htmlFor="flat-rate">Flat rate shipping</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="real-time"
                  checked={formData.shippingModel === 'calculated'}
                  onCheckedChange={(checked) => updateFormData('shippingModel', checked ? 'calculated' : '')}
                />
                <Label htmlFor="real-time">Real-time calculated shipping rates</Label>
              </div>
            </div>
          </div>

          <div>
            <Label>Locations served:</Label>
            <div className="space-y-2 mt-2">
              {[
                'Domestic only',
                'United States',
                'Canada', 
                'International'
              ].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={formData.locationsServed.includes(location)}
                    onCheckedChange={() => toggleArrayField('locationsServed', location)}
                  />
                  <Label htmlFor={`location-${location}`}>{location}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fulfillment Timing</CardTitle>
          <CardDescription>Set expectations for order processing and shipping times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="standardTurnaround">Standard turnaround time</Label>
            <Select
              value={formData.standardTurnaround}
              onValueChange={(value) => updateFormData('standardTurnaround', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select standard turnaround" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2 business days">1-2 business days</SelectItem>
                <SelectItem value="3-5 business days">3-5 business days</SelectItem>
                <SelectItem value="5-7 business days">5-7 business days</SelectItem>
                <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                <SelectItem value="2-3 weeks">2-3 weeks</SelectItem>
                <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="expressOptions">Express shipping options</Label>
            <Input
              id="expressOptions"
              value={formData.expressOptions}
              onChange={(e) => updateFormData('expressOptions', e.target.value)}
              placeholder="e.g., Rush orders available for next-day shipping"
            />
          </div>

          <div>
            <Label htmlFor="expressUpcharge">Express shipping upcharge</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">+$</span>
              <Input
                id="expressUpcharge"
                type="number"
                value={formData.expressUpcharge}
                onChange={(e) => updateFormData('expressUpcharge', e.target.value)}
                placeholder="15.00"
                step="0.01"
                className="max-w-32"
              />
              <span className="text-sm text-muted-foreground">additional for express orders</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="signatureRequired"
              checked={formData.signatureRequired}
              onCheckedChange={(checked) => updateFormData('signatureRequired', checked)}
            />
            <Label htmlFor="signatureRequired">
              Require signature for delivery on high-value orders
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Packaging Preferences</CardTitle>
          <CardDescription>Configure how your artwork will be packaged and presented</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Packaging options to include:</Label>
            <div className="space-y-2 mt-2">
              {[
                'Eco-friendly materials',
                'Protective backing boards',
                'Moisture protection',
                'Branded packaging',
                'Thank you cards'
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`packaging-${option}`}
                    checked={formData.packagingPreferences.includes(option)}
                    onCheckedChange={() => toggleArrayField('packagingPreferences', option)}
                  />
                  <Label htmlFor={`packaging-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="brandedInserts"
                checked={formData.brandedInserts}
                onCheckedChange={(checked) => updateFormData('brandedInserts', checked)}
              />
              <Label htmlFor="brandedInserts">
                Include branded insert cards with artist information
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="certificateAuthenticity"
                checked={formData.certificateAuthenticity}
                onCheckedChange={(checked) => updateFormData('certificateAuthenticity', checked)}
              />
              <Label htmlFor="certificateAuthenticity">
                Include certificate of authenticity
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="giftPackaging"
                checked={formData.giftPackaging}
                onCheckedChange={(checked) => updateFormData('giftPackaging', checked)}
              />
              <Label htmlFor="giftPackaging">
                Offer gift packaging option (may include additional fee)
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="packagingNotes">Additional packaging notes or requirements</Label>
            <Textarea
              id="packagingNotes"
              value={formData.packagingNotes}
              onChange={(e) => updateFormData('packagingNotes', e.target.value)}
              placeholder="Any special instructions for packaging your artwork..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSection6 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Structure</CardTitle>
          <CardDescription>
            Select which pages and sections your website should include
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select the pages to include on your website:</Label>
            <div className="space-y-2 mt-2">
              {[
                'Home',
                'Gallery/Shop',
                'About', 
                'Contact',
                'FAQ/Returns',
                'Blog/Journal',
                'Commission Info'
              ].map((page) => (
                <div key={page} className="flex items-center space-x-2">
                  <Checkbox
                    id={`page-${page}`}
                    checked={formData.websitePages.includes(page)}
                    onCheckedChange={() => toggleArrayField('websitePages', page)}
                  />
                  <Label htmlFor={`page-${page}`}>{page}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Recommended Page Structure:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Home:</strong> Welcome visitors with your featured artwork and story</li>
              <li>• <strong>Gallery/Shop:</strong> Display and sell your artwork</li>
              <li>• <strong>About:</strong> Share your artistic journey and background</li>
              <li>• <strong>Contact:</strong> Make it easy for customers to reach you</li>
              <li>• <strong>FAQ/Returns:</strong> Address common questions and policies</li>
              <li>• <strong>Blog/Journal:</strong> Share your creative process and updates</li>
              <li>• <strong>Commission Info:</strong> Details about custom work opportunities</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content & Marketing Features</CardTitle>
          <CardDescription>Configure additional website features and marketing tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emailMarketing"
              checked={formData.emailMarketing}
              onCheckedChange={(checked) => updateFormData('emailMarketing', checked)}
            />
            <Label htmlFor="emailMarketing">
              Enable email newsletter signup and marketing
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="blogUpdates"
              checked={formData.blogUpdates}
              onCheckedChange={(checked) => updateFormData('blogUpdates', checked)}
            />
            <Label htmlFor="blogUpdates">
              Enable blog/journal for sharing updates and process
            </Label>
          </div>

          {formData.emailMarketing && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Email Marketing Benefits:</strong> Stay connected with customers, announce new artwork, 
                share behind-the-scenes content, and drive repeat sales.
              </p>
            </div>
          )}

          {formData.blogUpdates && (
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Blog Benefits:</strong> Improve SEO, share your creative process, build personal 
                connections with visitors, and establish yourself as an expert in your field.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics & Tracking</CardTitle>
          <CardDescription>Set up tracking to understand your website performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="analyticsId">Google Analytics ID or Facebook Pixel ID (optional)</Label>
            <Input
              id="analyticsId"
              value={formData.analyticsId}
              onChange={(e) => updateFormData('analyticsId', e.target.value)}
              placeholder="e.g., G-XXXXXXXXXX or 123456789012345"
            />
            <p className="text-xs text-muted-foreground mt-1">
              If you have existing analytics tracking, provide your ID here. We can help set this up if needed.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Why Analytics Matter:</h4>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Track which artworks are most popular</li>
              <li>• Understand where your visitors come from</li>
              <li>• Monitor sales conversion rates</li>
              <li>• Optimize your marketing efforts</li>
              <li>• Make data-driven decisions about your art business</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promotion & Discount Strategy</CardTitle>
          <CardDescription>Plan your promotional campaigns and discount offerings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="promotionStrategy">Describe your promotional and discount strategy</Label>
            <Textarea
              id="promotionStrategy"
              value={formData.promotionStrategy}
              onChange={(e) => updateFormData('promotionStrategy', e.target.value)}
              placeholder="e.g., Launch discount for first customers, seasonal sales, limited-time offers for email subscribers, bulk purchase discounts, student discounts, etc."
              rows={4}
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Promotion Ideas:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Launch Special:</strong> 10-20% off for first-time customers</li>
              <li>• <strong>Email Subscriber Perks:</strong> Exclusive early access to new work</li>
              <li>• <strong>Seasonal Sales:</strong> Holiday discounts, end-of-year clearance</li>
              <li>• <strong>Bundle Deals:</strong> Buy 2 prints, get 1 at 50% off</li>
              <li>• <strong>Limited Time:</strong> Flash sales for social media followers</li>
              <li>• <strong>Loyalty Program:</strong> Return customer discounts</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Note:</strong> We'll integrate discount code functionality and automated promotional tools 
              based on your strategy. You'll have full control over when and how to offer promotions.
            </p>
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
          {currentSection === 3 && renderSection3()}
          {currentSection === 4 && renderSection4()}
          {currentSection === 5 && renderSection5()}
          {currentSection === 6 && renderSection6()}
          {[7, 8].includes(currentSection) && (
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
                <p><strong>Product Types:</strong> {formData.productTypes.join(', ') || 'None selected'}</p>
                <p><strong>Print Media:</strong> {formData.printMedia.join(', ') || 'None selected'}</p>
                <p><strong>Pricing Model:</strong> {formData.pricingModel || 'Not selected'}</p>
                <p><strong>Shipping Model:</strong> {formData.shippingModel || 'Not selected'}</p>
                <p><strong>Packaging Prefs:</strong> {formData.packagingPreferences.join(', ') || 'None selected'}</p>
                <p><strong>Website Pages:</strong> {formData.websitePages.join(', ') || 'None selected'}</p>
                <p><strong>Email Marketing:</strong> {formData.emailMarketing ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Blog Updates:</strong> {formData.blogUpdates ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Analytics ID:</strong> {formData.analyticsId || 'Not provided'}</p>
                <p><strong>Form ID:</strong> {formData.id || 'Not assigned yet'}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
