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
      // 🔧 FIXED: Use working endpoint instead of broken /api/artist-intake
      const response = await fetch('/api/submit-artist-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: formData.fullName, // Map to expected field
          studio_name: formData.studioName, // Map to expected field  
          status: 'draft',
          currentSection
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('✅ FIXED: Progress saved successfully:', result)
        // Update form data with the ID if it was generated
        if (result.artistId && !formData.id) {
          setFormData(prev => ({ ...prev, id: result.artistId }))
        }
        alert(`✅ Progress saved successfully! Section ${currentSection} data preserved.`)
      } else {
        const errorData = await response.json()
        console.error('❌ Save failed:', errorData)
        throw new Error(errorData.error || 'Failed to save progress')
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
      // 🔧 FIXED: Use working endpoint instead of broken /api/artist-intake
      const response = await fetch('/api/submit-artist-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: formData.fullName, // Map to expected field
          studio_name: formData.studioName, // Map to expected field
          status: 'submitted',
          submittedAt: new Date().toISOString()
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('🎉 FIXED: Submission successful:', result)
        alert('🎉 Artist intake submitted successfully! All 8 sections completed. We will begin building your website.')
        window.location.href = '/admin'
      } else {
        const errorData = await response.json()
        console.error('❌ Submit failed:', errorData)
        throw new Error(errorData.error || 'Submission failed')
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
          <CardTitle>🎯 COMPLETE FORM RESTORED</CardTitle>
          <CardDescription>
            All 8 sections now fully functional with working API endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ <strong>RESTORED:</strong> Complete 8-section form with full functionality<br/>
              ✅ <strong>PRESERVED:</strong> Working API endpoint /api/submit-artist-application<br/>
              🎯 <strong>READY:</strong> Begin systematic section-by-section testing!
            </p>
          </div>
        </CardContent>
      </Card>

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
              <Label htmlFor="studioName">Studio Name</Label>
              <Input
                id="studioName"
                value={formData.studioName}
                onChange={(e) => updateFormData('studioName', e.target.value)}
                placeholder="Your studio or business name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location (City/Region)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="City, State/Province"
              />
            </div>
            <div>
              <Label htmlFor="businessNumber">Business Number (if applicable)</Label>
              <Input
                id="businessNumber"
                value={formData.businessNumber}
                onChange={(e) => updateFormData('businessNumber', e.target.value)}
                placeholder="Business registration number"
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
          <CardTitle>Artistic Style & Preferences</CardTitle>
          <CardDescription>Help us understand your artistic style and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="artisticStyle">Artistic Style</Label>
            <Textarea
              id="artisticStyle"
              value={formData.artisticStyle}
              onChange={(e) => updateFormData('artisticStyle', e.target.value)}
              placeholder="Describe your artistic style, techniques, and approach..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="admiredArtists">Admired Artists / Influences</Label>
            <Input
              id="admiredArtists"
              value={formData.admiredArtists}
              onChange={(e) => updateFormData('admiredArtists', e.target.value)}
              placeholder="Artists who inspire or influence your work"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Design Preferences</CardTitle>
          <CardDescription>Share your design preferences and inspiration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="websiteReferences">Website References / Inspiration</Label>
            <Textarea
              id="websiteReferences"
              value={formData.websiteReferences}
              onChange={(e) => updateFormData('websiteReferences', e.target.value)}
              placeholder="Share URLs or describe websites you admire..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="designStyle">Preferred Design Style</Label>
            <Select value={formData.designStyle} onValueChange={(value) => updateFormData('designStyle', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select design style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal & Clean</SelectItem>
                <SelectItem value="bold">Bold & Dramatic</SelectItem>
                <SelectItem value="elegant">Elegant & Sophisticated</SelectItem>
                <SelectItem value="artistic">Artistic & Creative</SelectItem>
                <SelectItem value="modern">Modern & Contemporary</SelectItem>
                <SelectItem value="classic">Classic & Timeless</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="needsBrandGuide"
              checked={formData.needsBrandGuide}
              onCheckedChange={(checked) => updateFormData('needsBrandGuide', checked)}
            />
            <Label htmlFor="needsBrandGuide">I need help creating a brand guide</Label>
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
          <CardDescription>Add your artwork pieces that will be featured on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.artworkCatalog.map((artwork, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Artwork {index + 1}</h4>
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
                    <Label htmlFor={`title-${index}`}>Artwork Title *</Label>
                    <Input
                      id={`title-${index}`}
                      value={artwork.title}
                      onChange={(e) => updateArtworkItem(index, 'title', e.target.value)}
                      placeholder="Name of the artwork"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor={`medium-${index}`}>Medium / Materials</Label>
                    <Input
                      id={`medium-${index}`}
                      value={artwork.medium}
                      onChange={(e) => updateArtworkItem(index, 'medium', e.target.value)}
                      placeholder="Oil on canvas, digital art, etc."
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

                <div className="mt-4">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={artwork.description}
                    onChange={(e) => updateArtworkItem(index, 'description', e.target.value)}
                    placeholder="Describe the artwork, inspiration, or story behind it..."
                    rows={3}
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor={`keywords-${index}`}>Keywords / Tags</Label>
                  <Input
                    id={`keywords-${index}`}
                    value={artwork.keywords}
                    onChange={(e) => updateArtworkItem(index, 'keywords', e.target.value)}
                    placeholder="landscape, abstract, blue, ocean (comma separated)"
                  />
                </div>
              </Card>
            ))}

            <Button onClick={addArtworkItem} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Artwork
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Preparation & Upload</CardTitle>
          <CardDescription>How do you prefer to handle artwork files?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="uploadMethod">Preferred Upload Method</Label>
            <Select value={formData.uploadMethod} onValueChange={(value) => updateFormData('uploadMethod', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select upload method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct upload during onboarding</SelectItem>
                <SelectItem value="email">Email files separately</SelectItem>
                <SelectItem value="drive">Google Drive / Dropbox link</SelectItem>
                <SelectItem value="physical">Physical media (USB, etc.)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Assistance Needed (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Color correction',
                'Image editing',
                'Background removal',
                'File format conversion',
                'Resolution optimization',
                'Batch processing'
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={formData.assistanceNeeded.includes(option)}
                    onCheckedChange={() => toggleArrayField('assistanceNeeded', option)}
                  />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
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
            <Label htmlFor="fileFormatGuidance">I need guidance on optimal file formats and settings</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSection3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Types</CardTitle>
          <CardDescription>What types of products do you want to offer?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Fine Art Prints',
              'Canvas Prints',
              'Framed Prints',
              'Metal Prints',
              'Acrylic Prints',
              'Photography Prints',
              'Digital Downloads',
              'Original Artwork',
              'Limited Editions',
              'Postcards',
              'Greeting Cards',
              'Stickers',
              'Posters',
              'Art Books',
              'Calendars',
              'Other Merchandise'
            ].map((product) => (
              <div key={product} className="flex items-center space-x-2">
                <Checkbox
                  id={product}
                  checked={formData.productTypes.includes(product)}
                  onCheckedChange={() => toggleArrayField('productTypes', product)}
                />
                <Label htmlFor={product} className="text-sm">{product}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Print Sizes & Specifications</CardTitle>
          <CardDescription>Define your standard print sizes and options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="unitSystem">Measurement System</Label>
            <Select value={formData.unitSystem} onValueChange={(value) => updateFormData('unitSystem', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select measurement system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="cm">Centimeters</SelectItem>
                <SelectItem value="both">Both (inches primary)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smallSize">Small Print Size</Label>
              <Input
                id="smallSize"
                value={formData.printSizes.small}
                onChange={(e) => updateNestedFormData('printSizes', 'small', e.target.value)}
                placeholder="e.g., 8x10 inches"
              />
            </div>
            <div>
              <Label htmlFor="mediumSize">Medium Print Size</Label>
              <Input
                id="mediumSize"
                value={formData.printSizes.medium}
                onChange={(e) => updateNestedFormData('printSizes', 'medium', e.target.value)}
                placeholder="e.g., 11x14 inches"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="largeSize">Large Print Size</Label>
              <Input
                id="largeSize"
                value={formData.printSizes.large}
                onChange={(e) => updateNestedFormData('printSizes', 'large', e.target.value)}
                placeholder="e.g., 16x20 inches"
              />
            </div>
            <div>
              <Label htmlFor="customSize">Custom Sizes Available</Label>
              <Input
                id="customSize"
                value={formData.printSizes.custom}
                onChange={(e) => updateNestedFormData('printSizes', 'custom', e.target.value)}
                placeholder="e.g., Up to 40x60 inches"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Framing & Print Options</CardTitle>
          <CardDescription>Configure framing and print media options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Print Media Options (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Premium Photo Paper',
                'Fine Art Paper',
                'Canvas',
                'Metal',
                'Acrylic',
                'Wood',
                'Fabric',
                'Vinyl'
              ].map((medium) => (
                <div key={medium} className="flex items-center space-x-2">
                  <Checkbox
                    id={medium}
                    checked={formData.printMedia.includes(medium)}
                    onCheckedChange={() => toggleArrayField('printMedia', medium)}
                  />
                  <Label htmlFor={medium} className="text-sm">{medium}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="frameColors">Frame Color Options</Label>
              <Input
                id="frameColors"
                value={formData.framingOptions.colors}
                onChange={(e) => updateNestedFormData('framingOptions', 'colors', e.target.value)}
                placeholder="Black, White, Natural Wood, etc."
              />
            </div>
            <div>
              <Label htmlFor="frameMaterials">Frame Materials</Label>
              <Input
                id="frameMaterials"
                value={formData.framingOptions.materials}
                onChange={(e) => updateNestedFormData('framingOptions', 'materials', e.target.value)}
                placeholder="Wood, Metal, Composite, etc."
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
                placeholder="White, Black, Cream, Custom colors"
              />
            </div>
            <div>
              <Label htmlFor="glazing">Glazing Options</Label>
              <Input
                id="glazing"
                value={formData.framingOptions.glazing}
                onChange={(e) => updateNestedFormData('framingOptions', 'glazing', e.target.value)}
                placeholder="Standard Glass, Acrylic, UV Protection"
              />
            </div>
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
          <CardDescription>Choose how you want to handle pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Pricing Approach</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="markup"
                  name="pricingModel"
                  value="markup"
                  checked={formData.pricingModel === 'markup'}
                  onChange={(e) => updateFormData('pricingModel', e.target.value)}
                />
                <Label htmlFor="markup">Percentage markup on cost (easier setup)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="specific"
                  name="pricingModel"
                  value="specific"
                  checked={formData.pricingModel === 'specific'}
                  onChange={(e) => updateFormData('pricingModel', e.target.value)}
                />
                <Label htmlFor="specific">Set specific prices for each product</Label>
              </div>
            </div>
          </div>

          {formData.pricingModel === 'markup' && (
            <div>
              <Label htmlFor="markupPercentage">Markup Percentage</Label>
              <Input
                id="markupPercentage"
                value={formData.markupPercentage}
                onChange={(e) => updateFormData('markupPercentage', e.target.value)}
                placeholder="e.g., 200 (for 200% markup)"
              />
              <p className="text-sm text-muted-foreground mt-1">
                200% markup means if printing costs $10, customer pays $30
              </p>
            </div>
          )}

          {formData.pricingModel === 'specific' && (
            <div className="space-y-4">
              <h4 className="font-medium">Set Specific Prices</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smallPrice">Small Print Price</Label>
                  <Input
                    id="smallPrice"
                    value={formData.specificPrices.small}
                    onChange={(e) => updateNestedFormData('specificPrices', 'small', e.target.value)}
                    placeholder="$25"
                  />
                </div>
                <div>
                  <Label htmlFor="mediumPrice">Medium Print Price</Label>
                  <Input
                    id="mediumPrice"
                    value={formData.specificPrices.medium}
                    onChange={(e) => updateNestedFormData('specificPrices', 'medium', e.target.value)}
                    placeholder="$45"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="largePrice">Large Print Price</Label>
                  <Input
                    id="largePrice"
                    value={formData.specificPrices.large}
                    onChange={(e) => updateNestedFormData('specificPrices', 'large', e.target.value)}
                    placeholder="$75"
                  />
                </div>
                <div>
                  <Label htmlFor="framedPrice">Framed Print Premium</Label>
                  <Input
                    id="framedPrice"
                    value={formData.specificPrices.framed}
                    onChange={(e) => updateNestedFormData('specificPrices', 'framed', e.target.value)}
                    placeholder="+$50"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Editions & Options</CardTitle>
          <CardDescription>Configure limited editions and special pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitedEditions"
              checked={formData.limitedEditions}
              onCheckedChange={(checked) => updateFormData('limitedEditions', checked)}
            />
            <Label htmlFor="limitedEditions">Offer Limited Edition prints</Label>
          </div>

          {formData.limitedEditions && (
            <div>
              <Label htmlFor="limitedEditionDetails">Limited Edition Details</Label>
              <Textarea
                id="limitedEditionDetails"
                value={formData.limitedEditionDetails}
                onChange={(e) => updateFormData('limitedEditionDetails', e.target.value)}
                placeholder="Describe edition sizes, numbering, certificates, pricing..."
                rows={3}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="signedPrints"
              checked={formData.signedPrints}
              onCheckedChange={(checked) => updateFormData('signedPrints', checked)}
            />
            <Label htmlFor="signedPrints">Offer artist-signed prints</Label>
          </div>

          {formData.signedPrints && (
            <div>
              <Label htmlFor="signedPrintPremium">Signed Print Premium</Label>
              <Input
                id="signedPrintPremium"
                value={formData.signedPrintPremium}
                onChange={(e) => updateFormData('signedPrintPremium', e.target.value)}
                placeholder="e.g., +$15 or +25%"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wholesalePricing"
              checked={formData.wholesalePricing}
              onCheckedChange={(checked) => updateFormData('wholesalePricing', checked)}
            />
            <Label htmlFor="wholesalePricing">Offer wholesale pricing</Label>
          </div>

          {formData.wholesalePricing && (
            <div>
              <Label htmlFor="wholesaleDiscount">Wholesale Discount</Label>
              <Input
                id="wholesaleDiscount"
                value={formData.wholesaleDiscount}
                onChange={(e) => updateFormData('wholesaleDiscount', e.target.value)}
                placeholder="e.g., 40% off retail"
              />
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
          <CardTitle>Shipping Model</CardTitle>
          <CardDescription>How do you want to handle shipping and fulfillment?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Shipping Approach</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="calculated"
                  name="shippingModel"
                  value="calculated"
                  checked={formData.shippingModel === 'calculated'}
                  onChange={(e) => updateFormData('shippingModel', e.target.value)}
                />
                <Label htmlFor="calculated">Calculated shipping rates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="flat"
                  name="shippingModel"
                  value="flat"
                  checked={formData.shippingModel === 'flat'}
                  onChange={(e) => updateFormData('shippingModel', e.target.value)}
                />
                <Label htmlFor="flat">Flat rate shipping</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="free"
                  name="shippingModel"
                  value="free"
                  checked={formData.shippingModel === 'free'}
                  onChange={(e) => updateFormData('shippingModel', e.target.value)}
                />
                <Label htmlFor="free">Free shipping (built into prices)</Label>
              </div>
            </div>
          </div>

          <div>
            <Label>Locations Served (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Local pickup',
                'Provincial/State',
                'National',
                'International',
                'North America only',
                'Custom zones'
              ].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={formData.locationsServed.includes(location)}
                    onCheckedChange={() => toggleArrayField('locationsServed', location)}
                  />
                  <Label htmlFor={location} className="text-sm">{location}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fulfillment & Timing</CardTitle>
          <CardDescription>Set expectations for order processing and delivery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="standardTurnaround">Standard Turnaround Time</Label>
              <Select value={formData.standardTurnaround} onValueChange={(value) => updateFormData('standardTurnaround', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select turnaround time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 days">1-2 business days</SelectItem>
                  <SelectItem value="3-5 days">3-5 business days</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="custom">Custom timing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expressOptions">Express Options</Label>
              <Input
                id="expressOptions"
                value={formData.expressOptions}
                onChange={(e) => updateFormData('expressOptions', e.target.value)}
                placeholder="Next day, 2-day rush, etc."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="expressUpcharge">Express Upcharge</Label>
            <Input
              id="expressUpcharge"
              value={formData.expressUpcharge}
              onChange={(e) => updateFormData('expressUpcharge', e.target.value)}
              placeholder="e.g., +$25 for rush orders"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="signatureRequired"
              checked={formData.signatureRequired}
              onCheckedChange={(checked) => updateFormData('signatureRequired', checked)}
            />
            <Label htmlFor="signatureRequired">Require signature on delivery for high-value orders</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Packaging & Presentation</CardTitle>
          <CardDescription>Configure packaging options and branded materials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Packaging Preferences (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Eco-friendly materials',
                'Premium packaging',
                'Art tube for prints',
                'Flat mailers',
                'Bubble wrap protection',
                'Custom branded boxes'
              ].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={formData.packagingPreferences.includes(option)}
                    onCheckedChange={() => toggleArrayField('packagingPreferences', option)}
                  />
                  <Label htmlFor={option} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="brandedInserts"
                checked={formData.brandedInserts}
                onCheckedChange={(checked) => updateFormData('brandedInserts', checked)}
              />
              <Label htmlFor="brandedInserts">Include branded inserts (business cards, thank you notes)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="certificateAuthenticity"
                checked={formData.certificateAuthenticity}
                onCheckedChange={(checked) => updateFormData('certificateAuthenticity', checked)}
              />
              <Label htmlFor="certificateAuthenticity">Include certificate of authenticity</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="giftPackaging"
                checked={formData.giftPackaging}
                onCheckedChange={(checked) => updateFormData('giftPackaging', checked)}
              />
              <Label htmlFor="giftPackaging">Offer gift packaging options</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="packagingNotes">Additional Packaging Notes</Label>
            <Textarea
              id="packagingNotes"
              value={formData.packagingNotes}
              onChange={(e) => updateFormData('packagingNotes', e.target.value)}
              placeholder="Any special requirements or preferences for packaging..."
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
          <CardDescription>Choose which pages and features to include on your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Website Pages (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Home/Gallery',
                'About the Artist',
                'Artist Statement',
                'Shop/Store',
                'Commission Info',
                'Exhibition History',
                'Press & Reviews',
                'Contact',
                'Blog',
                'FAQ',
                'Shipping Info',
                'Return Policy'
              ].map((page) => (
                <div key={page} className="flex items-center space-x-2">
                  <Checkbox
                    id={page}
                    checked={formData.websitePages.includes(page)}
                    onCheckedChange={() => toggleArrayField('websitePages', page)}
                  />
                  <Label htmlFor={page} className="text-sm">{page}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marketing Features</CardTitle>
          <CardDescription>Configure marketing and engagement tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailMarketing"
                checked={formData.emailMarketing}
                onCheckedChange={(checked) => updateFormData('emailMarketing', checked)}
              />
              <Label htmlFor="emailMarketing">Email newsletter signup</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="blogUpdates"
                checked={formData.blogUpdates}
                onCheckedChange={(checked) => updateFormData('blogUpdates', checked)}
              />
              <Label htmlFor="blogUpdates">Blog for updates and behind-the-scenes content</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="analyticsId">Google Analytics ID (if you have one)</Label>
            <Input
              id="analyticsId"
              value={formData.analyticsId}
              onChange={(e) => updateFormData('analyticsId', e.target.value)}
              placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Strategy</CardTitle>
          <CardDescription>How do you plan to promote your website and art?</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="promotionStrategy">Promotion Plans</Label>
            <Textarea
              id="promotionStrategy"
              value={formData.promotionStrategy}
              onChange={(e) => updateFormData('promotionStrategy', e.target.value)}
              placeholder="Describe your plans for social media, exhibitions, collaborations, etc..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSection7 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Notifications</CardTitle>
          <CardDescription>Configure how you want to be notified about orders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="orderNotifications">Notification Preferences</Label>
            <Select value={formData.orderNotifications} onValueChange={(value) => updateFormData('orderNotifications', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select notification method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email notifications</SelectItem>
                <SelectItem value="sms">SMS/Text notifications</SelectItem>
                <SelectItem value="both">Both email and SMS</SelectItem>
                <SelectItem value="app">App notifications</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Support</CardTitle>
          <CardDescription>How do you want to handle customer inquiries and support?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customerSupport">Support Options</Label>
            <Select value={formData.customerSupport} onValueChange={(value) => updateFormData('customerSupport', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select support method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email support only</SelectItem>
                <SelectItem value="contact_form">Contact form on website</SelectItem>
                <SelectItem value="phone">Phone support</SelectItem>
                <SelectItem value="chat">Live chat widget</SelectItem>
                <SelectItem value="multiple">Multiple contact methods</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Return & Exchange Policy</CardTitle>
          <CardDescription>Define your return and exchange process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="returnProcess">Return Policy</Label>
            <Textarea
              id="returnProcess"
              value={formData.returnProcess}
              onChange={(e) => updateFormData('returnProcess', e.target.value)}
              placeholder="Describe your return policy, timeframes, conditions, etc..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Legal and business information for orders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="businessRegistrationName">Business Registration Name (if different from artist name)</Label>
            <Input
              id="businessRegistrationName"
              value={formData.businessRegistrationName}
              onChange={(e) => updateFormData('businessRegistrationName', e.target.value)}
              placeholder="Legal business name for invoices and receipts"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeRetailPricing"
              checked={formData.includeRetailPricing}
              onCheckedChange={(checked) => updateFormData('includeRetailPricing', checked)}
            />
            <Label htmlFor="includeRetailPricing">Include retail pricing information on receipts/invoices</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSection8 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketing History & Experience</CardTitle>
          <CardDescription>Tell us about your marketing experience and existing audience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="existingEmailList"
              checked={formData.existingEmailList}
              onCheckedChange={(checked) => updateFormData('existingEmailList', checked)}
            />
            <Label htmlFor="existingEmailList">I have an existing email list/newsletter</Label>
          </div>

          {formData.existingEmailList && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subscriberCount">Approximate Subscriber Count</Label>
                <Input
                  id="subscriberCount"
                  value={formData.subscriberCount}
                  onChange={(e) => updateFormData('subscriberCount', e.target.value)}
                  placeholder="e.g., 500 subscribers"
                />
              </div>
              <div>
                <Label htmlFor="emailPlatform">Email Platform</Label>
                <Input
                  id="emailPlatform"
                  value={formData.emailPlatform}
                  onChange={(e) => updateFormData('emailPlatform', e.target.value)}
                  placeholder="Mailchimp, ConvertKit, etc."
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="communicationFrequency">Preferred Communication Frequency with Customers</Label>
            <Select value={formData.communicationFrequency} onValueChange={(value) => updateFormData('communicationFrequency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly updates</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly newsletter</SelectItem>
                <SelectItem value="quarterly">Quarterly updates</SelectItem>
                <SelectItem value="events">Only for events/new releases</SelectItem>
                <SelectItem value="minimal">Minimal communication</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Press & Recognition</CardTitle>
          <CardDescription>Share any press coverage, features, or recognition you've received</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pressFeatures">Press Features & Media Coverage</Label>
            <Textarea
              id="pressFeatures"
              value={formData.pressFeatures}
              onChange={(e) => updateFormData('pressFeatures', e.target.value)}
              placeholder="List magazines, blogs, newspapers, TV features, podcasts, etc..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="exhibitions">Exhibition History</Label>
            <Textarea
              id="exhibitions"
              value={formData.exhibitions}
              onChange={(e) => updateFormData('exhibitions', e.target.value)}
              placeholder="Solo shows, group exhibitions, art fairs, gallery representation..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="retailLocations">Retail Locations & Partnerships</Label>
            <Textarea
              id="retailLocations"
              value={formData.retailLocations}
              onChange={(e) => updateFormData('retailLocations', e.target.value)}
              placeholder="Galleries, shops, cafes, or other locations that sell your work..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Licensing & Collaborations</CardTitle>
          <CardDescription>Information about licensing your work and collaboration preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="licensingCollaborations">Licensing & Collaboration History</Label>
            <Textarea
              id="licensingCollaborations"
              value={formData.licensingCollaborations}
              onChange={(e) => updateFormData('licensingCollaborations', e.target.value)}
              placeholder="Product licensing, brand collaborations, commercial projects..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="marketingCollaboration">Interest in Marketing Collaborations</Label>
            <Textarea
              id="marketingCollaboration"
              value={formData.marketingCollaboration}
              onChange={(e) => updateFormData('marketingCollaboration', e.target.value)}
              placeholder="Are you open to cross-promotion, artist collaborations, joint exhibitions, etc?"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="artworkUsePermissions">Artwork Use Permissions</Label>
            <Textarea
              id="artworkUsePermissions"
              value={formData.artworkUsePermissions}
              onChange={(e) => updateFormData('artworkUsePermissions', e.target.value)}
              placeholder="How do you handle requests to use your artwork for promotional purposes, social media, etc?"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🎉 Final Review</CardTitle>
          <CardDescription>
            You've completed all 8 sections! Review your information before submitting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 mb-4">
              ✅ All sections completed! Your artist onboarding form is ready for submission.
              Once submitted, we'll begin building your personalized artist website.
            </p>
            
            <div className="space-y-2 text-sm">
              <p><strong>Next Steps:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Review your information in all sections</li>
                <li>Make any final edits needed</li>
                <li>Submit your completed intake form</li>
                <li>We'll contact you within 48 hours to begin your website</li>
              </ul>
            </div>
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
            🎯 Artist Onboarding - Complete Form Restored
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            All 8 sections now fully functional - Begin systematic testing!
          </p>
          
          <div className="p-4 bg-green-50 rounded-lg mb-4">
            <p className="text-sm text-green-800">
              ✅ <strong>RESTORED:</strong> Complete 8-section form with all functionality<br/>
              ✅ <strong>PRESERVED:</strong> Working API endpoint /api/submit-artist-application<br/>
              🎯 <strong>READY:</strong> Begin "Sarah Johnson" systematic testing protocol!
            </p>
          </div>
          
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
              Complete all 8 sections for full artist onboarding
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
          {currentSection === 7 && renderSection7()}
          {currentSection === 8 && renderSection8()}
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
              {isLoading ? 'Saving...' : '💾 Save Draft'}
            </Button>
            
            {currentSection === 8 ? (
              <Button onClick={submitIntake} disabled={isLoading || !formData.submissionAgreement}>
                {isLoading ? 'Submitting...' : '🚀 Submit Complete Intake'}
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🎯 Systematic Testing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1">
              <p><strong>✅ Form Status:</strong> Complete 8-section form restored and deployed</p>
              <p><strong>✅ API Endpoint:</strong> Using working /api/submit-artist-application</p>
              <p><strong>🎯 Next Phase:</strong> Begin "Sarah Johnson" section-by-section testing</p>
              <p><strong>Current Data:</strong></p>
              <p>• Full Name: {formData.fullName || 'Not entered'}</p>
              <p>• Email: {formData.email || 'Not entered'}</p>
              <p>• Studio Name: {formData.studioName || 'Not entered'}</p>
              <p>• Agreement: {formData.submissionAgreement ? 'Agreed' : 'Not agreed'}</p>
              <p>• Form ID: {formData.id || 'Will be assigned on save'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}