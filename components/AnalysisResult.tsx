import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalysisResultProps {
  result: {
    url: string
    isValid: boolean
    title: string
    description: string
    securityThreats: string[]
  } | null
}
export function AnalysisResult({ result }: AnalysisResultProps) {
  if (!result) return null

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Analysis Result</CardTitle>
        <CardDescription>{result.url}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Valid URL:</strong> {result.isValid ? 'Yes' : 'No'}</p>
          <p><strong>Title:</strong> {result.title}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <div>
            <strong>Security Threats:</strong>
            {Array.isArray(result.securityThreats) && result.securityThreats.length > 0 ? (
              <ul className="list-disc pl-5">
                {result.securityThreats.map((threat, index) => (
                  <li key={index}>{threat}</li>
                ))}
              </ul>
            ) : (
              <p>No threats detected</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}