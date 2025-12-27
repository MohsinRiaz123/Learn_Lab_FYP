export function CardWrapper({ title, description, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {(title || description) && (
        <div className="p-6 border-b">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
