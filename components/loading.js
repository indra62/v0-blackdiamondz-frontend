export default function Loading({ error }) {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      {error && <p className="text-white ml-3">{error}</p>}
    </div>
  )
}
