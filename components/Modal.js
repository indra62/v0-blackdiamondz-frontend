// components/Modal.js
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

export default function Modal({ isOpen, onClose, children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/60"
    >
      <div
        style={{
          position: "relative",
          width: "90vw",
          height: "90vh",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl"
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1010,
            background: "#211f17",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}
