'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from 'lucide-react'

interface AnalysisData {
  url: string
  isValid: boolean
  metadata: {
    title: string
    description: string
    keywords: string
    favicon: string
    ogImage: string
    lastModified: string
    language: string
    author: string
    siteName: string
    type: string
    url: string
    canonicalUrl: string
    robots: string
    themeColor: string
    viewport: string
    generator: string
    copyright: string
    publisher: string
    category: string
    pageLoadTime: number
    contentLength: number
    headingsCount: {
      h1: number
      h2: number
      h3: number
      h4: number
      h5: number
      h6: number
    }
    linksCount: number
    imagesCount: number
    hasNewsletter: boolean
    hasSocialLinks: {
      facebook: boolean
      twitter: boolean
      instagram: boolean
      linkedin: boolean
    }
    security: {
      isSecure: boolean;
      headers: {
        'Strict-Transport-Security': string;
        'Content-Security-Policy': string;
        'X-Content-Type-Options': string;
        'X-Frame-Options': string;
        'X-XSS-Protection': string;
        'Referrer-Policy': string;
      };
      hasSSL: boolean;
      securityScore: number;
    };
  }
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setAnalysisData(null)

    try {
      const response = await fetch('https://link-z084.onrender.com/api/links/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const result = await response.json()

      if (result.success) {
        setAnalysisData(result.data)
      } else {
        setError(result.message || 'An error occurred')
      }
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2>Made By Anshul Kumar</h2>
      <h1 className="text-3xl font-bold mb-6">Link Analyzer</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze"
            required
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading} className='bg-black hover:bg-black/90 text-white'>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {analysisData && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>{analysisData.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="mr-2">
                  {analysisData.isValid ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-red-500" />
                  )}
                </span>
                <span>{analysisData.isValid ? 'Valid URL' : 'Invalid URL'}</span>
              </div>
              <div className="flex items-center mt-4">
                <span className="mr-2">
                  {analysisData.metadata.security.hasSSL ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-red-500" />
                  )}
                </span>
                <span>{analysisData.isValid ? 'Has SSL' : 'Has Not SSL'}</span>
              </div>
              <div>
                <strong>Title:</strong> {analysisData.metadata.title}
              </div>
              <div>
                <strong>Description:</strong> {analysisData.metadata.description}
              </div>
              <div>
                <strong>Language:</strong> {analysisData.metadata.language}
              </div>
              <div>
                <strong>Last Modified:</strong> {new Date(analysisData.metadata.lastModified).toLocaleString()}
              </div>
              <div>
                <strong>Content Length:</strong> {analysisData.metadata.contentLength} bytes
              </div>
              <div>
                <strong>Links Count:</strong> {analysisData.metadata.linksCount}
              </div>
              <div>
                <strong>Images Count:</strong> {analysisData.metadata.imagesCount}
              </div>
              <div>
                <strong>Has Newsletter:</strong> {analysisData.metadata.hasNewsletter ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Headings Count</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(analysisData.metadata.headingsCount).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key.toUpperCase()}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Social Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(analysisData.metadata.hasSocialLinks).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value ? 'Yes' : 'No'}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Security Headers</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(analysisData.metadata.security.headers).map(([key, value]) => (
                  value ? (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  ) : null
                ))}
              </div>
            </div>
            <h3 className="font-semibold mb-2">Security Score :{analysisData.metadata.security.securityScore}</h3>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

