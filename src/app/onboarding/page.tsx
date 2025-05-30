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
  const [formData, setFormData] = useState<ArtistIntakeData>