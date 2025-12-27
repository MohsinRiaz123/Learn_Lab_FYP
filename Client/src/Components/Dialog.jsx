import { useEffect } from "react"

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function DialogHeader({ children, className = "", ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function DialogTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h2>
  )
}

export function DialogFooter({ children, className = "", ...props }) {
  return (
    <div className={`flex justify-end space-x-2 mt-6 ${className}`} {...props}>
      {children}
    </div>
  )
}
