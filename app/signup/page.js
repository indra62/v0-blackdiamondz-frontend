/**
 * Signup Page
 *
 * User registration page with multi-field signup form.
 * Split layout with image on the left and form on the right.
 *
 * @page
 */

import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Left side - Sydney Harbour Image */}
        <div className="hidden md:block w-1/2">
          <Image
            src="/sydney-aerial-view.png"
            alt="Sydney Harbour Aerial View"
            fill
            priority
            className="object-cover"
            style={{ position: "absolute", height: "100%", width: "100%" }}
          />
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full md:w-1/2 bg-[#211f17] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className={`${taviraj.className} text-white text-5xl mb-12 text-center`}>Join the Club!</h1>

            {/* Registration form with validation */}
            {/* In production, this would connect to an auth service or API */}
            <form>
              <div className="flex flex-col">
                <div className="flex w-full">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-1/2 bg-transparent border border-[#656565] border-r-0 border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-1/2 bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                  required
                />

                <div className="flex w-full">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-1/2 bg-transparent border border-[#656565] border-r-0 border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-1/2 bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#BD9574] text-[#211f17] p-4 hover:bg-[#d4af37] transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[#656565]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#BD9574] hover:text-[#d4af37] transition-colors">
                  Sign in!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
