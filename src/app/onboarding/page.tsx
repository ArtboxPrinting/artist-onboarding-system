"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Artist Onboarding System
          </h1>
          <p className="text-lg text-muted-foreground">
            Simplified onboarding page for testing
          </p>
          <Badge variant="outline" className="mt-4">
            System Test Version
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Artist Onboarding</CardTitle>
              <CardDescription>
                This is a simplified version to test system functionality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The full 4-section onboarding system will be restored once 
                the deployment issues are resolved.
              </p>
              <div className="flex gap-4">
                <Button>Test Button</Button>
                <Button variant="outline">Secondary Button</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}