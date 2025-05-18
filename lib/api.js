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


const getConfig = (params = {}, headers = {}) => ({
  params,
  headers: { ...api.defaults.headers.common, ...headers }
})

export async function getItem(collection, id, params = {}, headers = {}) {
  try {
    const response = await api.get(`/items/${collection}/${id}`, getConfig(params, headers))
    return response.data.data
  } catch (error) {
    console.error(`Error fetching ${collection} item:`, error)
    return null
  }
}

export async function getItems(collection, params = {}, headers = {}, fullResponse = false) {
  try {
    const response = await api.get(`/items/${collection}`, getConfig(params, headers))
    if(fullResponse){
      return response.data
    }
    return response.data.data
  } catch (error) {
    console.error(`Error fetching ${collection} items:`, error)
    throw error
  }
}

export async function getFilteredItems(collection, filter, headers = {}) {
  try {
    const response = await api.get(`/items/${collection}`, {
      ...getConfig({ filter }, headers)
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

export async function getUsers(params = {}, headers = {}) {
  try {
    const response = await api.get(`/users`, getConfig(params, headers))
    return response.data.data
  } catch (error) {
    console.error(`Error fetching users:`, error)
    throw error
  }
}

export async function getUser(id, params = {}, headers = {}) {
  try {
    const response = await api.get(`/users/${id}`, getConfig(params, headers))
    return response.data.data
  } catch (error) {
    console.error(`Error fetching user:`, error)
    throw error
  }
}

export async function submitAgencyApplication(formData) {
  try {
    const response = await api.post("/items/agency_applications", {
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender, // 1: male, 2: female
      years_of_experience: formData.years_of_experience,
      country_id: formData.country_id,
      city_id: formData.city_id,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    })
    return response.data.data
  } catch (error) {
    console.error("Error submitting agency application", error)
    throw error
  }
}

export async function submitPropertySellSubmission(formData) {
  try {
    const response = await api.post("/items/property_sale_submission", {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      country_id: formData.country_id,
      city_id: formData.city_id,
      property_type: formData.property_type,
      sale_type: formData.sale_type,
      property_address: formData.property_address,
      message: formData.message,
    })
    return response.data.data
  } catch (error) {
    console.error("Error submitting agency application", error)
    throw error
  }
}

export async function submitClubDiamondApplication(formData) {
  try {
    const response = await api.post("/items/club_member_application", {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      country_id: formData.country_id,
      residential_property_price_range: formData.residential_property_price_range,
      investing_property_price_range: formData.investing_property_price_range,
      interested_in_concierge_services: formData.interested_in_concierge_services,
      message: formData.message,
    })
    return response.data.data
  } catch (error) {
    console.error("Error submitting club member application", error)
    throw error
  }
}

export default api;

