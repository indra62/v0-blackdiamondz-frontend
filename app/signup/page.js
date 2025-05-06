/**
 * Signup Page
 *
 * User registration page with multi-field signup form.
 * Split layout with image on the left and form on the right.
 *
 * @page
 */
"use client"
import Link from "next/link"
import Image from "next/image"
import { Taviraj } from "next/font/google"
import { apiSignup, getImageUrl, getItems } from "@/lib/api"
import { useEffect, useState } from "react"
import Loading from "@/components/loading"

const taviraj = Taviraj({ subsets: ["latin"], weight: ["300"] })

export default function SignupPage() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems("Global", {
          fields: ["signup_image.*"],
        })

        setData(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load signup image" + err.message)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters")
      return
    }

    try {
      setIsSubmitting(true)
      await apiSignup(formData)
      setSuccess(true)
    } catch (err) {
      setFormError(
        err.response?.data?.errors?.[0]?.message ||
          "Registration failed. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  getImageUrl(data?.signup_image?.id, {
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

            {/* Right side - Signup Form */}
            <div className="w-full md:w-1/2 bg-[#211f17] flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <h1
                  className={`${taviraj.className} text-white text-5xl mb-12 text-center`}
                >
                  Join the Club!
                </h1>

                {success ? (
                  <div className="text-center text-white p-4 border border-[#BD9574]">
                    <p className="mb-4">
                      Registration successful! Please check your email to verify
                      your account.
                    </p>
                    <Link
                      href="/login"
                      className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
                    >
                      Go to login
                    </Link>
                  </div>
                ) : (
                  <>
                    {formError && (
                      <div className="mb-4 p-3 bg-red-900/50 text-white border border-red-500">
                        {formError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col">
                        <div className="flex w-full">
                          <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className="w-1/2 bg-transparent border border-[#656565] border-r-0 border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className="w-1/2 bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                          />
                        </div>

                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="w-full bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />

                        <div className="flex w-full">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-1/2 bg-transparent border border-[#656565] border-r-0 border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                            required
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-1/2 bg-transparent border border-[#656565] border-b-0 p-4 text-white focus:outline-none focus:border-[#BD9574]"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#BD9574] text-[#211f17] p-4 hover:bg-[#BD9574] transition-colors disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </button>
                      </div>
                    </form>

                    <div className="mt-8 text-center">
                      <p className="text-[#656565]">
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className="text-[#BD9574] hover:text-[#BD9574] transition-colors"
                        >
                          Sign in!
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}