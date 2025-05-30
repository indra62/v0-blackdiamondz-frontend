import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/useAuth"
import { Toaster } from "react-hot-toast"
import SocialMediaLinks from "@/components/socialMedia"
import Header from "@/components/header"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Black Diamondz - Luxury Real Estate",
  description: "Premier luxury real estate brokerage in Australia",
  generator: "v0.dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#211F17]`}>
        <AuthProvider>
          <Suspense fallback={null}>
            <Toaster position="top-center" reverseOrder={false} />
            <Header />
            {children}
            <SocialMediaLinks />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
