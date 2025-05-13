export default function Loading({ error, dark = true }) {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className={`animate-spin rounded-full h-8 w-8 border-2 ${dark ? "border-white" : "border-[#211F17]"} border-t-transparent`}></div>
      {error && <p className={`${dark ? "text-white" : "text-[#211F17]"} ml-3`}>{error}</p>}
    </div>
  )
}
