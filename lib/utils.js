import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr) {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getYouTubeEmbedUrl(url) {
	const regex =
		/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/;
	const match = url.match(regex);
	if (match && match[1]) {
		return `https://www.youtube.com/embed/${match[1]}`;
	}
	return null;
}
