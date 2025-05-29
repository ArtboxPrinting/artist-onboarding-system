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
  businessNumber