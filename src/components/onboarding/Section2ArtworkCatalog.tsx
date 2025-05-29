"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Image, FileText, Tag, Calendar } from "lucide-react"

interface Section2Props {
  onSectionComplete: (sectionId: number) => void
  onSaveProgress: () => void
  artistId?: string
  initialData?: any
  updateSectionData: (data: any) => void
  artistInitials?: string
}

// Add proper TypeScript interface for form data
interface FormData {
  artworkCount: string
  categories: string[]
  fileFormat: string
  resolution: string
  catalogMethod: string
  artworkInfo: string
}

export default function Section2ArtworkCatalog({
  onSectionComplete,
  onSaveProgress,
  artistId,
  initialData,
  updateSectionData,
  artistInitials
}: Section2Props) {
  const [formData, setFormData] = useState<FormData>({
    artworkCount: "",
    categories: [],
    fileFormat: "",
    resolution: "",
    catalogMethod: "",
    artworkInfo: "",
    ...initialData
  })

  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData((prev: FormData) => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  useEffect(() => {
    validateForm()
    updateSectionData(formData)
  }, [formData, updateSectionData])

  const validateForm = () => {
    const hasRequiredFields = 
      formData.artworkCount &&
      formData.categories.length > 0 &&
      formData.catalogMethod

    setIsValid(!!hasRequiredFields)
  }

  const handleComplete = async () => {
    if (isValid) {
      await onSaveProgress()
      onSectionComplete(2)
    }
  }

  const categories = [
    "Paintings", "Drawings", "Digital Art", "Photography", "Prints",
    "Mixed Media", "Sculpture", "Abstract", "Landscape", "Portrait",
    "Still Life", "Contemporary", "Traditional"
  ]

  const toggleCategory = (category: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          <Image className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Artwork Catalog & File Management</h3>
          <p className="text-sm text-muted-foreground">
            Setup your artwork collection and file organization
          </p>
        </div>
        {isValid && (
          <Badge className="ml-auto bg-green-600">
            ✓ Ready to Continue
          </Badge>
        )}
      </div>

      {/* Artwork Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Artwork Collection Overview
          </CardTitle>
          <CardDescription>
            Tell us about your current artwork collection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Approximate number of artworks you want to sell *</label>
            <select
              value={formData.artworkCount}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, artworkCount: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="">Select artwork count</option>
              <option value="1-10">1-10 pieces</option>
              <option value="11-25">11-25 pieces</option>
              <option value="26-50">26-50 pieces</option>
              <option value="51-100">51-100 pieces</option>
              <option value="100+">100+ pieces</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Artwork Categories *</label>
            <p className="text-sm text-muted-foreground">
              Select all categories that apply to your artwork
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    formData.categories.includes(category)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {formData.categories.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: {formData.categories.join(", ")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            File Management & Quality
          </CardTitle>
          <CardDescription>
            Technical specifications for your artwork files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary file format</label>
            <select
              value={formData.fileFormat}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, fileFormat: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="">Select file format</option>
              <option value="JPEG">JPEG (most common)</option>
              <option value="PNG">PNG (with transparency)</option>
              <option value="TIFF">TIFF (highest quality)</option>
              <option value="RAW">RAW files</option>
              <option value="mixed">Mixed formats</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image resolution/quality</label>
            <select
              value={formData.resolution}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, resolution: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="">Select resolution quality</option>
              <option value="high">High resolution (300+ DPI, print-ready)</option>
              <option value="medium">Medium resolution (150-300 DPI)</option>
              <option value="web">Web resolution (72-150 DPI)</option>
              <option value="mixed">Mixed resolutions</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Catalog Organization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Catalog Organization
          </CardTitle>
          <CardDescription>
            How would you like to organize and upload your artwork?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred cataloging method *</label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="catalogMethod"
                  value="upload-now"
                  checked={formData.catalogMethod === "upload-now"}
                  onChange={(e) => setFormData((prev: FormData) => ({ ...prev, catalogMethod: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Upload files now</div>
                  <div className="text-sm text-muted-foreground">
                    I'm ready to upload my artwork files during this onboarding process
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="catalogMethod"
                  value="upload-later"
                  checked={formData.catalogMethod === "upload-later"}
                  onChange={(e) => setFormData((prev: FormData) => ({ ...prev, catalogMethod: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Setup catalog structure, upload later</div>
                  <div className="text-sm text-muted-foreground">
                    I want to complete the setup first and upload files later
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="catalogMethod"
                  value="assistance"
                  checked={formData.catalogMethod === "assistance"}
                  onChange={(e) => setFormData((prev: FormData) => ({ ...prev, catalogMethod: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">I need assistance with file organization</div>
                  <div className="text-sm text-muted-foreground">
                    I'd like help organizing and uploading my artwork files
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional artwork information</label>
            <textarea
              value={formData.artworkInfo}
              onChange={(e) => setFormData((prev: FormData) => ({ ...prev, artworkInfo: e.target.value }))}
              placeholder="Any additional details about your artwork collection, specific requirements, or questions about file management..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* File Upload Placeholder */}
      {formData.catalogMethod === "upload-now" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Artwork Files
            </CardTitle>
            <CardDescription>
              Upload your artwork files to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Feature Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                File upload functionality will be available in the next step.
                For now, we'll record your preferences and setup the catalog structure.
              </p>
              <Badge variant="secondary">
                File Upload: Next Phase
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

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
            Complete Section 2 →
          </Button>
        </div>
      </div>
    </div>
  )
}