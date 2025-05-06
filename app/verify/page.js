/**
 * Verify Page
 *
 * Email verification page for new user accounts.
 * Split layout with image on the left and verification content on the right.
 *
 * @page
 */
"use client"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { getImageUrl, getItems, verify } from "@/lib/api"
import { useEffect, useState, Suspense } from "react"
import Loading from "@/components/loading"
import { useSearchParams } from "next/navigation"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })

// Component to handle the search params
function VerificationContent() {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [verificationError, setVerificationError] = useState(null)

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleVerify = async () => {
    if (!token) {
      setVerificationError("Verification token is missing")
      return
    }

    try {
      setVerifying(true)
      const result = await verify(token)
      if (result) {
        setVerified(true)
      } else {
        setVerificationError(
          "Verification failed. The token may be invalid or expired."
        )
      }
    } catch (err) {
      setVerificationError("An error occurred during verification")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="text-center mb-8">
      {verified ? (
        <div className="text-[#E2DBCC] p-6 border border-[#BD9574]">
          <p className="mb-4">Your account has been successfully verified!</p>
          <p className="mb-6">You can now log in to access your account.</p>
          <Link
            href="/login"
            className="inline-block bg-[#BD9574] text-[#211f17] px-6 py-3 hover:bg-[#BD9574] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {verificationError && (
            <div className="mb-6 p-4 border border-red-500 text-red-300 w-full">
              {verificationError}
            </div>
          )}

          <p className="text-[#E2DBCC] mb-8">
            Please click the button below to verify your email address and
            activate your account.
          </p>

          <button
            onClick={handleVerify}
            disabled={verifying || !token}
            className="w-full bg-[#BD9574] text-[#211f17] p-4 hover:bg-[#BD9574] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifying ? "Verifying..." : "Verify Email"}
          </button>

          {!token && (
            <p className="mt-4 text-[#BD9574]">
              No verification token found. Please check your email link.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function VerifyPage({ params }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems("Global", {
          fields: ["login_image.*"],
        })

        setData(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load verification image" + err.message)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-[#211f17]">
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={error} />
        </section>
      ) : (
        <>
          <div className="flex min-h-[calc(100vh-60px)]">
            {/* Left side - Sydney Harbour Image */}
            <div className="hidden md:block w-1/2 relative">
              <Image
                src={
                  getImageUrl(data?.login_image?.id, {
                    format: "webp",
                    quality: 80,
                    fit: "cover",
                  }) || "/sydney-sunset-boats.png"
                }
                alt="Sydney Harbour"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Right side - Verification Content */}
            <div className="w-full md:w-1/2 bg-[#211f17] flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <h1
                  className={`${taviraj.className} text-white text-5xl mb-12 text-center`}
                >
                  Verify Your Account
                </h1>

                <Suspense
                  fallback={
                    <div className="text-center text-white">
                      Loading verification details...
                    </div>
                  }
                >
                  <VerificationContent />
                </Suspense>

                <div className="mt-8 text-center">
                  <p className="text-[#656565]">
                    Already verified?{" "}
                    <Link
                      href="/login"
                      className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
                    >
                      Sign in!
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
