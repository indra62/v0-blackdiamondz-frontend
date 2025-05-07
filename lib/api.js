import axios from "axios"

const directusURL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"

const api = axios.create({
  baseURL: directusURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  proxy: false,
})

export async function getItem(collection, id, params = {}) {
  try {
    const response = await api.get(`/items/${collection}/${id}`, { params })
    return response.data.data
  } catch (error) {
    console.error(`Error fetching ${collection} item:`, error)
    return null
  }
}

export async function getItems(collection, params = {}) {
  try {
    const requestConfig = { params };
    // Log the full API URL including query params
    console.log("API URL:", api.getUri({ url: `/items/${collection}`, ...requestConfig }));
    const response = await api.get(`/items/${collection}`, requestConfig);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${collection} items:`, error)
    throw error
  }
}

export async function getFilteredItems(collection, filter) {
  try {
    const response = await api.get(`/items/${collection}`, {
      params: {
        filter,
      },
    })
    return response.data.data
  } catch (error) {
    console.error(`Error fetching filtered ${collection} items:`, error)
    return null
  }
}

export function getAssetUrl(fileId, params = {}) {
  if (!fileId) return ""
  const queryString = new URLSearchParams(params).toString()
  return `${directusURL}/assets/${fileId}${
    queryString ? `?${queryString}` : ""
  }`
}

export function getFileUrl(fileId) {
  if (!fileId) return ""
  return `${directusURL}/assets/${fileId}`
}

export function getImageUrl(fileId, options = {}) {
  const {
    width,
    height,
    quality = 80,
    fit = "cover",
    format = "webp",
  } = options

  const params = {}

  // Only add parameters if they are defined
  if (width) params.width = width
  if (height) params.height = height
  if (quality) params.quality = quality
  if (fit) params.fit = fit
  if (format) params.format = format

  return getAssetUrl(fileId, params)
}

export async function submitSubscribe(formData) {
  try {
    const response = await api.post("/items/newsletter_subscribers", {
      email: formData.email,
    })
    return response.data.data
  } catch (error) {
    console.error("Error submitting subscribe", error)
    throw error
  }
}

export async function submitContact(formData) {
  try {
    const response = await api.post("/items/contact_us", {
      type: formData.type,
      first_name: formData.first_name,
      last_name: formData.last_name,
      country: formData.country,
      city: formData.city,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    })
    return response.data.data
  } catch (error) {
    console.error("Error submitting contact", error)
    throw error
  }
}

export async function apiSignup(formData) {
  try {
    const response = await api.post("/users/register", {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      verification_url: "https://main.blackdiamondz.62dev.net/verify",
    })
    return response.data.data
  } catch (error) {
    console.error("Error signup", error)
    throw error
  }
}

export async function verify(token) {
  try {
    const response = await api.get(
      `/users/register/verify-email?token=${token}`,
      {
        validateStatus: (status) => true,
      }
    )
    return response
  } catch (error) {
    console.error(`Error verifying user`, error)
    return null
  }
}

export async function getUsers(params = {}) {
  try {
    const response = await api.get(`/users/`, params)
    return response.data.data
  } catch (error) {
    console.error(`Error fetching users:`, error)
    throw error
  }
}

export async function getUser(id, params = {}) {
  try {
    const response = await api.get(`/users/${id}`, params)
    return response.data.data
  } catch (error) {
    console.error(`Error fetching user:`, error)
    throw error
  }
}

