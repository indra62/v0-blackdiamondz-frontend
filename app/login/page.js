import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Left side - Sydney Harbour Image */}
        <div className="hidden md:block w-1/2 relative">
          <Image src="/sydney-sunset-boats.png" alt="Sydney Harbour" fill priority className="object-cover" />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 bg-[#211f17] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className={`${taviraj.className} text-white text-5xl mb-12 text-center`}>Welcome back!</h1>

            <form>
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#BD9574] text-[#211f17] p-4 hover:bg-[#d4af37] transition-colors"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[#656565]">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#BD9574] hover:text-[#d4af37] transition-colors">
                  Sign up!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
