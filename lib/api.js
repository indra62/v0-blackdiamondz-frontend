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
    const response = await api.get(`/items/${collection}`, { params })
    return response.data.data
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
    console.error("Error submitting contact form:", error)
    throw error
  }
}
