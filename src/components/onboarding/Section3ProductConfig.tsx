"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, Ruler, Palette, Frame } from "lucide-react"

interface Section3Props {
  onSectionComplete: (sectionId: number) => void
  onSaveProgress: () => void
  artistId?: string
  initialData?: any
  updateSectionData: (data: any) => void
  artistInitials?: string
}

export default function Section3ProductConfig({
  onSectionComplete,
  onSaveProgress,
  artistId,
  initialData,
  updateSectionData,
  artistInitials
}: Section3Props) {
  const [formData, setFormData] = useState({
    printSizes: [],
    mediaTypes: [],
    framingOptions: [],
    customSizes: "",
    productPreferences: "",
    qualityLevel: "",
    ...initialData
  })

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
    const hasRequiredFields = 
      formData.printSizes.length > 0 &&
      formData.mediaTypes.length > 0 &&
      formData.qualityLevel

    setIsValid(!!hasRequiredFields)
  }

  const handleComplete = async () => {
    if (isValid) {
      await onSaveProgress()
      onSectionComplete(3)
    }
  }

  const printSizes = [
    "5x7 inches", "8x10 inches", "11x14 inches", "16x20 inches", 
    "18x24 inches", "24x36 inches", "A4 (8.3x11.7 inches)", "A3 (11.7x16.5 inches)",
    "Square 8x8 inches", "Square 12x12 inches", "Square 16x16 inches"
  ]

  const mediaTypes = [
    "Premium Photo Paper", "Canvas", "Fine Art Paper", "Metal Print",
    "Acrylic Print", "Wood Print", "Fabric Print", "Watercolor Paper",
    "Matte Paper", "Glossy Paper", "Pearl Paper"
  ]

  const framingOptions = [
    "No framing (print only)", "Basic black frame", "Basic white frame",
    "Premium wooden frame", "Metal frame", "Custom framing options",
    "Matting only", "Float mounting", "Canvas stretching"
  ]

  const toggleOption = (field: string, option: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }))
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Product Types & Variants</h3>
          <p className="text-sm text-muted-foreground">
            Configure print sizes, media types, and framing options
          </p>
        </div>
        {isValid && (
          <Badge className="ml-auto bg-green-600">
            ✓ Ready to Continue
          </Badge>
        )}
      </div>

      {/* Print Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Print Sizes
          </CardTitle>
          <CardDescription>
            Select all print sizes you want to offer for your artwork *
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {printSizes.map((size) => (
              <label
                key={size}
                className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.printSizes.includes(size)
                    ? "bg-primary/5 border-primary"
                    : "hover:bg-muted/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.printSizes.includes(size)}
                  onChange={() => toggleOption("printSizes", size)}
                  className="rounded"
                />
                <span className="text-sm font-medium">{size}</span>
              </label>
            ))}
          </div>
          
          {formData.printSizes.length > 0 && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-1">Selected sizes:</p>
              <p className="text-sm text-muted-foreground">
                {formData.printSizes.join(", ")}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="customSizes">Custom or additional sizes</Label>
            <Input
              id="customSizes"
              value={formData.customSizes}
              onChange={(e) => setFormData(prev => ({ ...prev, customSizes: e.target.value }))}
              placeholder="e.g., 30x40 inches, panoramic 12x36, or specific dimensions you need"
            />
            <p className="text-sm text-muted-foreground">
              Specify any custom sizes or dimensions not listed above
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Media Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Print Media Types
          </CardTitle>
          <CardDescription>
            Choose the printing materials you want to offer *
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mediaTypes.map((media) => (
              <label
                key={media}
                className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.mediaTypes.includes(media)
                    ? "bg-primary/5 border-primary"
                    : "hover:bg-muted/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.mediaTypes.includes(media)}
                  onChange={() => toggleOption("mediaTypes", media)}
                  className="rounded"
                />
                <span className="text-sm font-medium">{media}</span>
              </label>
            ))}
          </div>

          {formData.mediaTypes.length > 0 && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-1">Selected media types:</p>
              <p className="text-sm text-muted-foreground">
                {formData.mediaTypes.join(", ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Framing Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Frame className="w-5 h-5" />
            Framing & Finishing Options
          </CardTitle>
          <CardDescription>
            Select framing and finishing options you want to offer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {framingOptions.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.framingOptions.includes(option)
                    ? "bg-primary/5 border-primary"
                    : "hover:bg-muted/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.framingOptions.includes(option)}
                  onChange={() => toggleOption("framingOptions", option)}
                  className="rounded"
                />
                <span className="text-sm font-medium">{option}</span>
              </label>
            ))}
          </div>

          {formData.framingOptions.length > 0 && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-1">Selected framing options:</p>
              <p className="text-sm text-muted-foreground">
                {formData.framingOptions.join(", ")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quality & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Level & Preferences</CardTitle>
          <CardDescription>
            Set your overall quality standards and special requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Quality Level *</Label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="qualityLevel"
                  value="standard"
                  checked={formData.qualityLevel === "standard"}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualityLevel: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Standard Quality</div>
                  <div className="text-sm text-muted-foreground">
                    Good quality prints suitable for most customers
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="qualityLevel"
                  value="premium"
                  checked={formData.qualityLevel === "premium"}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualityLevel: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Premium Quality</div>
                  <div className="text-sm text-muted-foreground">
                    High-end materials and printing for discerning customers
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="qualityLevel"
                  value="mixed"
                  checked={formData.qualityLevel === "mixed"}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualityLevel: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Mixed Options</div>
                  <div className="text-sm text-muted-foreground">
                    Offer both standard and premium options to customers
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productPreferences">Additional product preferences or requirements</Label>
            <textarea
              id="productPreferences"
              value={formData.productPreferences}
              onChange={(e) => setFormData(prev => ({ ...prev, productPreferences: e.target.value }))}
              placeholder="Any specific requirements, preferred suppliers, color profiles, or special considerations for your prints..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Summary */}
      {(formData.printSizes.length > 0 || formData.mediaTypes.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Product Configuration Summary</CardTitle>
            <CardDescription>
              Overview of your product offerings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-primary mb-2">Print Sizes</p>
                <p className="text-muted-foreground">
                  {formData.printSizes.length} sizes selected
                </p>
              </div>
              <div>
                <p className="font-medium text-primary mb-2">Media Types</p>
                <p className="text-muted-foreground">
                  {formData.mediaTypes.length} media types selected
                </p>
              </div>
              <div>
                <p className="font-medium text-primary mb-2">Framing Options</p>
                <p className="text-muted-foreground">
                  {formData.framingOptions.length} framing options selected
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-primary/5 rounded-lg">
              <p className="text-sm font-medium text-primary mb-1">
                Estimated product variants per artwork:
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.printSizes.length * formData.mediaTypes.length} base combinations
                {formData.framingOptions.length > 0 && ` × ${formData.framingOptions.length} framing options`}
              </p>
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
            <span>Please select print sizes, media types, and quality level</span>
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
            Complete Section 3 →
          </Button>
        </div>
      </div>
    </div>
  )
}