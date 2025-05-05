/**
 * Login Page
 *
 * User authentication page with email/password form.
 * Split layout with image on the left and form on the right.
 *
 * @page
 */
"use client"
import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { getImageUrl, getItems } from "@/lib/api"
import { useEffect, useState } from "react"
import Loading from "@/components/loading"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })

export default function LoginPage() {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const { login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems("Global", {
          fields: ["login_image.*"],
        })

        setData(data)
        setLoading(false)
      } catch (err) {
        setErrors("Failed to load login image" + err.message)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      await login(email, password)
      toast.success("Logged in!", {
        style: {
          background: "#BD9574",
          color: "#211F17",
          border: "1px solid #211F17",
          borderRadius: "99px",
          padding: "16px 24px",
        },
        duration: 3000,
      })
      router.push("/")
    } catch (err) {
      toast.error(err.message, {
        style: {
          background: "#A1A1AA",
          color: "#211F17",
          border: "1px solid #211F17",
          borderRadius: "99px",
          padding: "16px 24px",
        },
      })
    }
  }

  return (
    <main className="min-h-screen bg-[#211f17]">
      <Header />
      {loading ? (
        <section className="flex justify-center items-center h-[800px] bg-[#211f17]">
          <Loading error={errors} />
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

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 bg-[#211f17] flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <h1
                  className={`${taviraj.className} text-white text-5xl mb-12 text-center`}
                >
                  Welcome back!
                </h1>

                {/* Authentication form */}
                {/* In production, this would connect to an auth service or API */}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                      required
                    />
                    <input
                      type="password"
                      name="password"
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
                    <Link
                      href="/signup"
                      className="text-[#BD9574] hover:text-[#d4af37] transition-colors"
                    >
                      Sign up!
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
