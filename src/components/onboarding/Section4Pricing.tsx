"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Calculator, TrendingUp, Settings } from "lucide-react"

interface Section4Props {
  onSectionComplete: (sectionId: number) => void
  onSaveProgress: () => void
  artistId?: string
  initialData?: any
  updateSectionData: (data: any) => void
  artistInitials?: string
}

export default function Section4Pricing({
  onSectionComplete,
  onSaveProgress,
  artistId,
  initialData,
  updateSectionData,
  artistInitials
}: Section4Props) {
  const [formData, setFormData] = useState({
    pricingStrategy: "",
    basePrice: "",
    markupPercentage: "",
    premiumMarkup: "",
    volumeDiscounts: false,
    customPricing: "",
    shippingStrategy: "",
    internationalShipping: false,
    taxHandling: "",
    specialOffers: "",
    priceRangeMin: "",
    priceRangeMax: "",
    ...initialData
  })

  const [isValid, setIsValid] = useState(false)
  const [priceExamples, setPriceExamples] = useState([])

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  useEffect(() => {
    validateForm()
    updateSectionData(formData)
    calculatePriceExamples()
  }, [formData, updateSectionData])

  const validateForm = () => {
    const hasRequiredFields = 
      formData.pricingStrategy &&
      formData.basePrice &&
      formData.markupPercentage &&
      formData.shippingStrategy

    setIsValid(!!hasRequiredFields)
  }

  const calculatePriceExamples = () => {
    if (!formData.basePrice || !formData.markupPercentage) return

    const baseCost = parseFloat(formData.basePrice)
    const markup = parseFloat(formData.markupPercentage) / 100

    if (!baseCost || !markup) return

    const examples = [
      { size: "8x10 Standard", cost: baseCost, price: Math.round(baseCost * (1 + markup) * 100) / 100 },
      { size: "11x14 Premium", cost: baseCost * 1.5, price: Math.round(baseCost * 1.5 * (1 + markup) * 100) / 100 },
      { size: "16x20 Canvas", cost: baseCost * 2, price: Math.round(baseCost * 2 * (1 + markup) * 100) / 100 }
    ]

    setPriceExamples(examples)
  }

  const handleComplete = async () => {
    if (isValid) {
      await onSaveProgress()
      onSectionComplete(4)
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Pricing & Markup Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Set up your pricing strategy and profit margins
          </p>
        </div>
        {isValid && (
          <Badge className="ml-auto bg-green-600">
            ✓ Ready to Complete
          </Badge>
        )}
      </div>

      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Pricing Strategy
          </CardTitle>
          <CardDescription>
            Choose your overall approach to pricing your artwork
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Pricing Approach *</Label>
            
            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                name="pricingStrategy"
                value="cost-plus"
                checked={formData.pricingStrategy === "cost-plus"}
                onChange={(e) => setFormData(prev => ({ ...prev, pricingStrategy: e.target.value }))}
                className="mt-1"
              />
              <div>
                <div className="font-medium">Cost-Plus Pricing</div>
                <div className="text-sm text-muted-foreground">
                  Set base costs and add consistent markup percentage across all products
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                name="pricingStrategy"
                value="value-based"
                checked={formData.pricingStrategy === "value-based"}
                onChange={(e) => setFormData(prev => ({ ...prev, pricingStrategy: e.target.value }))}
                className="mt-1"
              />
              <div>
                <div className="font-medium">Value-Based Pricing</div>
                <div className="text-sm text-muted-foreground">
                  Price based on perceived value and market positioning
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                name="pricingStrategy"
                value="competitive"
                checked={formData.pricingStrategy === "competitive"}
                onChange={(e) => setFormData(prev => ({ ...prev, pricingStrategy: e.target.value }))}
                className="mt-1"
              />
              <div>
                <div className="font-medium">Competitive Pricing</div>
                <div className="text-sm text-muted-foreground">
                  Price competitively based on similar artists and market rates
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                name="pricingStrategy"
                value="tiered"
                checked={formData.pricingStrategy === "tiered"}
                onChange={(e) => setFormData(prev => ({ ...prev, pricingStrategy: e.target.value }))}
                className="mt-1"
              />
              <div>
                <div className="font-medium">Tiered Pricing</div>
                <div className="text-sm text-muted-foreground">
                  Different pricing tiers for different product categories or quality levels
                </div>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Pricing Configuration
          </CardTitle>
          <CardDescription>
            Set your base costs and markup percentages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Cost per Print (USD) *</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, basePrice: e.target.value }))}
                placeholder="25.00"
                step="0.01"
              />
              <p className="text-sm text-muted-foreground">
                Average cost for a standard 8x10 print including materials and labor
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="markupPercentage">Markup Percentage *</Label>
              <Input
                id="markupPercentage"
                type="number"
                value={formData.markupPercentage}
                onChange={(e) => setFormData(prev => ({ ...prev, markupPercentage: e.target.value }))}
                placeholder="150"
                step="1"
              />
              <p className="text-sm text-muted-foreground">
                Percentage markup on base cost (150% = 2.5x cost)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="premiumMarkup">Premium Product Markup (%)</Label>
              <Input
                id="premiumMarkup"
                type="number"
                value={formData.premiumMarkup}
                onChange={(e) => setFormData(prev => ({ ...prev, premiumMarkup: e.target.value }))}
                placeholder="200"
                step="1"
              />
              <p className="text-sm text-muted-foreground">
                Higher markup for premium materials (canvas, metal, etc.)
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.volumeDiscounts}
                  onChange={(e) => setFormData(prev => ({ ...prev, volumeDiscounts: e.target.checked }))}
                />
                <span className="text-sm font-medium">Offer Volume Discounts</span>
              </label>
              <p className="text-sm text-muted-foreground">
                Automatic discounts for customers buying multiple items
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceRangeMin">Target Price Range</Label>
            <div className="flex items-center gap-3">
              <Input
                id="priceRangeMin"
                type="number"
                value={formData.priceRangeMin}
                onChange={(e) => setFormData(prev => ({ ...prev, priceRangeMin: e.target.value }))}
                placeholder="50"
                step="1"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                id="priceRangeMax"
                type="number"
                value={formData.priceRangeMax}
                onChange={(e) => setFormData(prev => ({ ...prev, priceRangeMax: e.target.value }))}
                placeholder="500"
                step="1"
              />
              <span className="text-muted-foreground">USD</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Expected price range for your products (optional, for reference)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Price Examples */}
      {priceExamples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pricing Examples</CardTitle>
            <CardDescription>
              Based on your markup settings, here are example prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {priceExamples.map((example, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium">{example.size}</p>
                  <p className="text-sm text-muted-foreground">Cost: ${example.cost}</p>
                  <p className="text-lg font-bold text-primary">Sale: ${example.price}</p>
                  <p className="text-sm text-green-600">
                    Profit: ${(example.price - example.cost).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipping & Logistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Shipping & Logistics
          </CardTitle>
          <CardDescription>
            Configure shipping options and logistics handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Shipping Strategy *</Label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="shippingStrategy"
                  value="free-shipping"
                  checked={formData.shippingStrategy === "free-shipping"}
                  onChange={(e) => setFormData(prev => ({ ...prev, shippingStrategy: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Free Shipping (Built into Price)</div>
                  <div className="text-sm text-muted-foreground">
                    Include shipping costs in product pricing
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="shippingStrategy"
                  value="calculated"
                  checked={formData.shippingStrategy === "calculated"}
                  onChange={(e) => setFormData(prev => ({ ...prev, shippingStrategy: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Calculated Shipping</div>
                  <div className="text-sm text-muted-foreground">
                    Charge actual shipping costs based on location and size
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/30">
                <input
                  type="radio"
                  name="shippingStrategy"
                  value="flat-rate"
                  checked={formData.shippingStrategy === "flat-rate"}
                  onChange={(e) => setFormData(prev => ({ ...prev, shippingStrategy: e.target.value }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Flat Rate Shipping</div>
                  <div className="text-sm text-muted-foreground">
                    Fixed shipping cost regardless of order size
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.internationalShipping}
                onChange={(e) => setFormData(prev => ({ ...prev, internationalShipping: e.target.checked }))}
              />
              <span className="text-sm font-medium">Offer International Shipping</span>
            </label>
            <p className="text-sm text-muted-foreground">
              Ship to customers outside your home country
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxHandling">Tax Handling</Label>
            <select
              id="taxHandling"
              value={formData.taxHandling}
              onChange={(e) => setFormData(prev => ({ ...prev, taxHandling: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="">Select tax approach</option>
              <option value="inclusive">Tax included in displayed prices</option>
              <option value="exclusive">Tax added at checkout</option>
              <option value="automatic">Automatic tax calculation by location</option>
              <option value="none">No tax handling (customer responsibility)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Special Pricing Options */}
      <Card>
        <CardHeader>
          <CardTitle>Special Offers & Custom Pricing</CardTitle>
          <CardDescription>
            Configure promotional offers and custom pricing options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specialOffers">Promotional Offers</Label>
            <textarea
              id="specialOffers"
              value={formData.specialOffers}
              onChange={(e) => setFormData(prev => ({ ...prev, specialOffers: e.target.value }))}
              placeholder="Describe any special offers you want to implement (e.g., first-time buyer discount, seasonal sales, bundle deals)..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customPricing">Custom Pricing Notes</Label>
            <textarea
              id="customPricing"
              value={formData.customPricing}
              onChange={(e) => setFormData(prev => ({ ...prev, customPricing: e.target.value }))}
              placeholder="Any specific pricing requirements, custom sizing fees, or special considerations..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      {formData.basePrice && formData.markupPercentage && (
        <Card>
          <CardHeader>
            <CardTitle>Pricing Configuration Summary</CardTitle>
            <CardDescription>
              Overview of your pricing setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium text-primary mb-1">Strategy</p>
                <p className="text-muted-foreground capitalize">
                  {formData.pricingStrategy?.replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="font-medium text-primary mb-1">Base Cost</p>
                <p className="text-muted-foreground">
                  ${formData.basePrice}
                </p>
              </div>
              <div>
                <p className="font-medium text-primary mb-1">Markup</p>
                <p className="text-muted-foreground">
                  {formData.markupPercentage}%
                </p>
              </div>
              <div>
                <p className="font-medium text-primary mb-1">Shipping</p>
                <p className="text-muted-foreground capitalize">
                  {formData.shippingStrategy?.replace('-', ' ')}
                </p>
              </div>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg">
              <p className="text-sm font-medium text-primary mb-1">
                Estimated profit margins:
              </p>
              <p className="text-sm text-muted-foreground">
                Standard products: {Math.round((parseFloat(formData.markupPercentage) || 0) / (100 + parseFloat(formData.markupPercentage) || 100) * 100)}% profit margin
              </p>
              {formData.premiumMarkup && (
                <p className="text-sm text-muted-foreground">
                  Premium products: {Math.round((parseFloat(formData.premiumMarkup) || 0) / (100 + parseFloat(formData.premiumMarkup) || 100) * 100)}% profit margin
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          {isValid ? (
            <span className="text-green-600 font-medium">✓ All sections completed! Ready to launch</span>
          ) : (
            <span>Please complete pricing configuration</span>
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
            Complete Setup 🚀
          </Button>
        </div>
      </div>
    </div>
  )
}