/**
 * Directus Connection Test Component
 *
 * This component tests the connection to Directus and displays
 * the available collections if successful.
 */
"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function DirectusConnectionTest() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [errorHint, setErrorHint] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const testConnection = async () => {
    try {
      setStatus("loading")
      const response = await fetch("/api/directus-test")
      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setData(result)
        setError(null)
        setErrorHint(null)
      } else {
        setStatus("error")
        setError(result.message || "Failed to connect to Directus")
        setErrorHint(result.hint || null)
        setDebugInfo(result.debug || null)
        setData(null)
      }
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setErrorHint("There was a problem with the network request. Check your browser console for more details.")
      setData(null)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Directus Connection Test</h2>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">Status:</span>
          {status === "loading" && (
            <div className="flex items-center text-blue-600">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Testing connection...
            </div>
          )}
          {status === "success" && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Connected successfully!
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center text-red-600">
              <XCircle className="w-5 h-5 mr-2" />
              Connection failed
            </div>
          )}

          <button
            onClick={testConnection}
            className="ml-auto flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 mb-4">
            <p className="font-medium">Error:</p>
            <p>{error}</p>

            {errorHint && (
              <div className="mt-2 pt-2 border-t border-red-200">
                <p className="font-medium">Hint:</p>
                <p>{errorHint}</p>
              </div>
            )}

            {debugInfo && (
              <div className="mt-2 pt-2 border-t border-red-200">
                <p className="font-medium">Debug Info:</p>
                <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-4 pt-2 border-t border-red-200">
              <p className="font-medium">Common Solutions:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                <li>Check that your Directus URL is correct and includes http:// or https://</li>
                <li>Verify your API token is valid and has not expired</li>
                <li>Make sure your Directus server is running and accessible</li>
                <li>Check for network connectivity issues or firewall restrictions</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {data && (
        <div>
          <div className="mb-4">
            <p className="font-medium">Directus URL:</p>
            <p className="text-gray-700">{data.directusUrl}</p>
          </div>

          <div>
            <p className="font-medium mb-2">Available Collections:</p>
            {data.collections && data.collections.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Collection Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.collections.map((collection: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {collection.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No collections found.</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">Next Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create collections in your Directus instance for your content types</li>
          <li>Add some sample content to test with</li>
          <li>Use the Directus SDK to fetch and display your content</li>
          <li>Implement authentication if needed for protected content</li>
        </ol>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-2">Helpful Resources:</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://docs.directus.io/getting-started/quickstart.html"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Directus Quickstart Guide
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.directus.io/reference/sdk.html"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Directus SDK Documentation
              </Link>
            </li>
            <li>
              <Link
                href="https://docs.directus.io/reference/authentication.html"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Directus Authentication Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
