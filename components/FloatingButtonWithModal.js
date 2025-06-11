import { useRef, useEffect, useState } from "react";

/**
 * FloatingButtonWithModal
 * @param {React.ReactNode} children - The content to show inside the modal
 * @param {string} buttonLabel - The label to show on the button
 * @param {React.ReactNode} buttonIcon - (optional) An icon to show in the button
 * @param {string} className - (optional) Extra classes for the button
 */
export default function FloatingButtonWithModal({
  children,
  buttonLabel = "Show map",
  buttonIcon,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <button
        className={`
          fixed left-1/2 bottom-4 -translate-x-1/2
          bg-[#bd9574] bg-opacity-90 text-[#211f17] rounded-full
          px-4 py-2 flex items-center gap-2 shadow-lg z-[1001]
          hover:bg-opacity-100 transition
          ${className} text-['archivo']
        `}
        onClick={() => setOpen(true)}
      >
        {buttonIcon}
        {buttonLabel}
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[1004] flex items-center justify-center bg-black/60">
          <div ref={modalRef} className="bg-[#211f17] rounded-lg shadow-xl p-6 max-w-full max-h-full relative">
            <button
              className="absolute top-2 right-2 text-white text-lg hover:text-[#bd9574]"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}