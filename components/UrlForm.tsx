import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UrlFormProps {
  onAnalyze: (url: string) => void
}

export function UrlForm({ onAnalyze }: UrlFormProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze(url)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to analyze"
        required
      />
      <Button type="submit">Analyze</Button>
    </form>
  )
}

