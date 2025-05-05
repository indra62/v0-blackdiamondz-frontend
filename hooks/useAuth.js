// hooks/useAuth.js
"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const API_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  "https://staging.cms.black-diamondz.62dev.org"

// Create axios instance with interceptor for token refresh
const api = axios.create({
  baseURL: API_URL,
})

// Create Auth Context
const AuthContext = createContext(null)

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshPromise, setRefreshPromise] = useState(null)

  // Setup axios interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          // If we're already refreshing, wait for that to complete
          if (isRefreshing) {
            try {
              await refreshPromise
              // After refresh, update the token in the request
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${localStorage.getItem("access_token")}`
              return api(originalRequest)
            } catch (refreshError) {
              return Promise.reject(refreshError)
            }
          }

          // Start a new refresh process
          try {
            setIsRefreshing(true)
            const refreshProcess = refreshToken()
            setRefreshPromise(refreshProcess)

            await refreshProcess
            // After refresh, update the token in the request
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${localStorage.getItem("access_token")}`
            return api(originalRequest)
          } catch (refreshError) {
            return Promise.reject(refreshError)
          } finally {
            setIsRefreshing(false)
            setRefreshPromise(null)
          }
        }

        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [isRefreshing, refreshPromise])

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token")
        if (token) {
          const userData = await fetchUserData(token)
          setUser(userData)
        }
      } catch (err) {
        console.error("Auth check failed:", err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const fetchUserData = async (token) => {
    try {
      const meResponse = await api.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const userId = meResponse.data.data.id

      const userResponse = await api.get(`/users/${userId}`, {
        params: {
          fields: ["*.*"],
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return userResponse.data.data
    } catch (err) {
      console.error("Error fetching user data:", err)
      throw new Error("Failed to fetch user data")
    }
  }

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token")
      if (!refreshToken) throw new Error("No refresh token available")

      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refresh_token: refreshToken,
        mode: "json",
      })

      localStorage.setItem("access_token", response.data.data.access_token)
      localStorage.setItem("refresh_token", response.data.data.refresh_token)

      return response.data.data
    } catch (err) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      setUser(null)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        setError,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext)
  const router = useRouter()

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const { user, loading, error, setUser, setError, refreshToken } = context

  // Login function
  const login = async (email, password) => {
    setError(null)
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      })

      // Store tokens
      localStorage.setItem("access_token", response.data.data.access_token)
      localStorage.setItem("refresh_token", response.data.data.refresh_token)

      // Fetch user data
      const userData = await fetchUserData(response.data.data.access_token)
      setUser(userData)

      return userData
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message || "Login failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token")

      if (refreshToken) {
        await api.post(`/auth/logout`, {
          refresh_token: refreshToken,
        })
      }
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      setUser(null)
      router.push("/login")
    }
  }

  // Register function
  const register = async (userData) => {
    setError(null)
    try {
      const response = await api.post(`/users/register`, {
        ...userData,
        verification_url: `${window.location.origin}/verify`,
      })

      return response.data
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message || "Registration failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Verify email
  const verifyEmail = async (token) => {
    setError(null)
    try {
      await api.get(`/users/register/verify-email?token=${token}`)
      return true
    } catch (err) {
      setError("Email verification failed")
      throw new Error("Email verification failed")
    }
  }

  const fetchUserData = async (token) => {
    try {
      const meResponse = await api.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const userId = meResponse.data.data.id

      const userResponse = await api.get(`/users/${userId}`, {
        params: {
          fields: ["*.*"],
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return userResponse.data.data
    } catch (err) {
      console.error("Error fetching user data:", err)
      throw new Error("Failed to fetch user data")
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    verifyEmail,
    refreshToken,
    isAuthenticated: !!user,
  }
}
