"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Enhanced artist data structure
interface ArtistProfile {
  id: string
  firstName: string
  lastName: string
  studioName: string
  email: string
  phone?: string
  status: "draft" | "in_review" | "ready" | "active" | "submitted"
  submissionDate?: string
  completedSections: number[]
  lastUpdated: string
  artworkCount?: number
  variantCount?: number
  completionPercentage?: number
  rawData?: any
}

const STATUS_COLORS = {
  draft: "bg-gray-100 text-gray-800",
  in_review: "bg-yellow-100 text-yellow-800", 
  ready: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  submitted: "bg-purple-100 text-purple-800"
}

export default function AdminDashboard() {
  const [artists, setArtists] = useState<ArtistProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(null)
  const [sortBy, setSortBy] = useState<string>("lastUpdated")

  // Fetch from artists table via working API
  const fetchArtistIntakes = async () => {
    try {
      setLoading(true)
      setError("")
      
      console.log('Fetching artist data from working API...')

      const response = await fetch('/api/artists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'API returned unsuccessful response')
      }

      console.log('Found artists:', result.data?.length || 0)
      console.log('Sample artist data:', result.data?.[0])

      // Use the data directly from the working /api/artists endpoint
      const transformedArtists = result.data?.map((artist: any) => ({
        id: artist.id,
        firstName: artist.firstName,
        lastName: artist.lastName,
        studioName: artist.studioName || 'Studio Not Set',
        email: artist.email,
        phone: artist.phone || '',
        status: artist.status || 'draft',
        completedSections: artist.completedSections || [1],
        artworkCount: artist.artworkCount || 0,
        variantCount: artist.variantCount || 0,
        lastUpdated: artist.lastUpdated,
        submissionDate: artist.submissionDate,
        completionPercentage: artist.completionPercentage || 25,
        rawData: artist.rawData
      })) || []

      setArtists(transformedArtists)
      
    } catch (err) {
      console.error('Error fetching artist data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch artist data')
    } finally {
      setLoading(false)
    }
  }

  // Fetch artists on component mount
  useEffect(() => {
    fetchArtistIntakes()
  }, [])

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.studioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || artist.status === statusFilter
    
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case "name":
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      case "studio":
        return a.studioName.localeCompare(b.studioName)
      case "completion":
        return (b.completedSections?.length || 0) - (a.completedSections?.length || 0)
      case "lastUpdated":
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
  })

  const statusCounts = {
    total: artists.length,
    draft: artists.filter(a => a.status === "draft").length,
    in_review: artists.filter(a => a.status === "in_review").length,
    ready: artists.filter(a => a.status === "ready").length,
    active: artists.filter(a => a.status === "active").length,
    submitted: artists.filter(a => a.status === "submitted").length
  }

  const completionStats = {
    section1: artists.filter(a => a.completedSections?.includes(1)).length,
    section2: artists.filter(a => a.completedSections?.includes(2)).length,
    section3: artists.filter(a => a.completedSections?.includes(3)).length,
    section4: artists.filter(a => a.completedSections?.includes(4)).length,
    section5: artists.filter(a => a.completedSections?.includes(5)).length,
    section6: artists.filter(a => a.completedSections?.includes(6)).length,
    complete: artists.filter(a => a.completedSections?.length === 8).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-lg font-medium">Loading artist data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              🎨 Artist Intake Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor artist onboarding progress and intake submissions
            </p>
            {artists.length > 0 && (
              <Badge variant="default" className="mt-2 bg-green-600">
                ✅ Connected - {artists.length} artists found
              </Badge>
            )}
            {error && (
              <Badge variant="destructive" className="mt-2">
                ❌ Connection Error
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fetchArtistIntakes()}>
              Refresh Data
            </Button>
            <Button onClick={() => window.location.href = '/onboarding'}>
              ➕ New Artist Intake
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              <strong>Database Connection Error:</strong> {error}
              <Button variant="outline" size="sm" onClick={fetchArtistIntakes} className="ml-4">
                Retry Connection
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Intakes
              </CardTitle>
              <div className="text-2xl font-bold">{statusCounts.total}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Draft
              </CardTitle>
              <div className="text-2xl font-bold text-gray-600">{statusCounts.draft}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Submitted
              </CardTitle>
              <div className="text-2xl font-bold text-purple-600">{statusCounts.submitted}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Review
              </CardTitle>
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.in_review}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ready
              </CardTitle>
              <div className="text-2xl font-bold text-blue-600">{statusCounts.ready}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active
              </CardTitle>
              <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
            </CardHeader>
          </Card>
        </div>

        {/* Completion Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Section Completion Statistics</CardTitle>
            <CardDescription>Track how many artists have completed each section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{completionStats.section1}</div>
                <div className="text-sm text-muted-foreground">Section 1: Profile</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completionStats.section2}</div>
                <div className="text-sm text-muted-foreground">Section 2: Artwork</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{completionStats.section3}</div>
                <div className="text-sm text-muted-foreground">Section 3: Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completionStats.section4}</div>
                <div className="text-sm text-muted-foreground">Section 4: Pricing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{completionStats.section5}</div>
                <div className="text-sm text-muted-foreground">Section 5: Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{completionStats.section6}</div>
                <div className="text-sm text-muted-foreground">Section 6: Website</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">{completionStats.complete}</div>
                <div className="text-sm text-muted-foreground">Complete (8/8)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter Artist Intakes</CardTitle>
            <CardDescription>
              Find and filter artist intake submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Artists Table */}
        <Card>
          <CardHeader>
            <CardTitle>Artist Intake Submissions</CardTitle>
            <CardDescription>
              {filteredArtists.length} of {artists.length} artists shown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedArtist(artist)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold">{artist.firstName} {artist.lastName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {artist.studioName} • {artist.email}
                          </p>
                        </div>
                        <Badge className={STATUS_COLORS[artist.status]}>
                          {artist.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>ID: {artist.id.substring(0, 8)}...</span>
                        <span>Updated: {new Date(artist.lastUpdated).toLocaleDateString()}</span>
                        <span>Sections: {artist.completedSections?.length || 0}/8</span>
                        <span className="font-medium text-green-600">
                          🎨 {artist.artworkCount} artworks
                        </span>
                        <span className="font-medium text-blue-600">
                          📦 {artist.variantCount} products
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredArtists.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {artists.length === 0 
                    ? "No artist intakes found. Encourage artists to complete the onboarding form." 
                    : "No intakes found matching your search criteria."
                  }
                </p>
                <Button 
                  onClick={() => window.location.href = '/onboarding'} 
                  className="mt-4"
                >
                  Start New Artist Intake
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Artist Details Modal */}
        {selectedArtist && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Artist Details: {selectedArtist.firstName} {selectedArtist.lastName}
                <Button variant="outline" onClick={() => setSelectedArtist(null)}>
                  Close
                </Button>
              </CardTitle>
              <CardDescription>
                Complete artist information and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedArtist.firstName} {selectedArtist.lastName}</p>
                      <p><strong>Email:</strong> {selectedArtist.email}</p>
                      <p><strong>Studio:</strong> {selectedArtist.studioName}</p>
                      <p><strong>Phone:</strong> {selectedArtist.phone || 'Not provided'}</p>
                      <p><strong>Status:</strong> 
                        <Badge className={`ml-2 ${STATUS_COLORS[selectedArtist.status]}`}>
                          {selectedArtist.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Progress Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Artist ID:</strong> {selectedArtist.id}</p>
                      <p><strong>Last Updated:</strong> {new Date(selectedArtist.lastUpdated).toLocaleString()}</p>
                      <p><strong>Completed Sections:</strong> {selectedArtist.completedSections?.length || 0}/8</p>
                      <p><strong>Completion:</strong> {Math.round(selectedArtist.completionPercentage || 0)}%</p>
                      <p><strong>Artwork Count:</strong> 🎨 {selectedArtist.artworkCount} pieces</p>
                      <p><strong>Product Types:</strong> 📦 {selectedArtist.variantCount} variants</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <details>
                    <summary className="font-semibold cursor-pointer">Raw Database Record (Debug)</summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-64">
                      {JSON.stringify(selectedArtist.rawData, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
