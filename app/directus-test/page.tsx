/**
 * Directus Test Page
 *
 * This page displays a test component that verifies the connection
 * to your Directus instance and shows available collections.
 */
import DirectusConnectionTest from "@/components/directus-connection-test"

export const metadata = {
  title: "Directus Connection Test",
  description: "Test your connection to Directus CMS",
}

export default function DirectusTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Directus Connection Test</h1>
        <DirectusConnectionTest />
      </div>
    </div>
  )
}
