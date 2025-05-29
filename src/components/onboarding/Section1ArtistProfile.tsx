"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, User, Mail, MapPin, Palette, Globe } from "lucide-react"

interface Section1Props {
  onSectionComplete: (sectionId: number) => void
  onSaveProgress: () => void
  artistId?: string
  initialData?: any
  updateSectionData: (data: any) => void
  artistInitials?: string
}

export default function Section1ArtistProfile({
  onSectionComplete,
  onSaveProgress,
  artistId,
  initialData,
  updateSectionData,
  artistInitials
}: Section1Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    artistStatement: "",
    website: "",
    instagram: "",
    facebook: "",
    brandColors: "",
    artStyle: [],
    experience: "",
    ...initialData
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  useEffect(() => {
    validateForm()
    updateSectionData(formData)
  }, [formData, updateSectionData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.bio?.trim()) {
      newErrors.bio = "Artist bio is required"
    } else if (formData.bio.length < 50) {
      newErrors.bio = "Bio should be at least 50 characters"
    }

    if (!formData.artistStatement?.trim()) {
      newErrors.artistStatement = "Artist statement is required"
    } else if (formData.artistStatement.length < 100) {
      newErrors.artistStatement = "Artist statement should be at least 100 characters"
    }

    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleStyleToggle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      artStyle: prev.artStyle.includes(style)
        ? prev.artStyle.filter(s => s !== style)
        : [...prev.artStyle, style]
    }))
  }

  const handleComplete = async () => {
    if (isValid) {
      await onSaveProgress()
      onSectionComplete(1)
    }
  }

  const artStyles = [
    "Abstract", "Realism", "Impressionism", "Modern", "Contemporary",
    "Digital Art", "Photography", "Mixed Media", "Watercolor", "Oil Painting",
    "Acrylic", "Sculpture", "Street Art", "Pop Art", "Minimalism"
  ]

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          {artistInitials || <User className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="font-semibold">Artist Profile & Brand Setup</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about yourself and your artistic identity
          </p>
        </div>
        {isValid && (
          <Badge className="ml-auto bg-green-600">
            ✓ Ready to Continue
          </Badge>
        )}
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Basic contact information and location details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="artist@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="City, State/Province, Country"
            />
          </div>
        </CardContent>
      </Card>

      {/* Artist Identity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Artist Identity
          </CardTitle>
          <CardDescription>
            Share your artistic background and creative identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bio">Artist Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell us about yourself as an artist. What inspires you? What's your background? (Min 50 characters)"
              rows={4}
              className={errors.bio ? "border-red-500" : ""}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formData.bio.length} characters</span>
              {errors.bio && (
                <p className="text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.bio}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="artistStatement">Artist Statement *</Label>
            <Textarea
              id="artistStatement"
              value={formData.artistStatement}
              onChange={(e) => handleInputChange("artistStatement", e.target.value)}
              placeholder="Describe your artistic vision, themes, and what you hope to communicate through your work. (Min 100 characters)"
              rows={5}
              className={errors.artistStatement ? "border-red-500" : ""}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formData.artistStatement.length} characters</span>
              {errors.artistStatement && (
                <p className="text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.artistStatement}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Art Styles & Mediums</Label>
            <p className="text-sm text-muted-foreground">
              Select all styles and mediums that apply to your work
            </p>
            <div className="flex flex-wrap gap-2">
              {artStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleStyleToggle(style)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    formData.artStyle.includes(style)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            {formData.artStyle.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: {formData.artStyle.join(", ")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="advanced">Advanced (5-10 years)</option>
              <option value="professional">Professional (10+ years)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Online Presence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Online Presence
          </CardTitle>
          <CardDescription>
            Your existing online presence and social media links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://yourartistwebsite.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                placeholder="@yourusername"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                placeholder="facebook.com/yourpage"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Brand Preferences
          </CardTitle>
          <CardDescription>
            Visual identity preferences for your art store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brandColors">Preferred Brand Colors</Label>
            <Input
              id="brandColors"
              value={formData.brandColors}
              onChange={(e) => handleInputChange("brandColors", e.target.value)}
              placeholder="e.g., Navy blue, gold, cream - colors that represent your artistic brand"
            />
            <p className="text-sm text-muted-foreground">
              These colors will be used in your personalized art store design
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          {isValid ? (
            <span className="text-green-600 font-medium">✓ Section completed successfully</span>
          ) : (
            <span>Please complete all required fields</span>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onSaveProgress}>
            Save Progress
          </Button>
          <Button 
            onClick={handleComplete}
            disabled={!isValid}
            className={isValid ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Complete Section 1 →
          </Button>
        </div>
      </div>
    </div>
  )
}