export function TabNavigation({ tabs, activeTab, onTabChange, children }) {
  return (
    <div>
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
              activeTab === tab.id ? "bg-white text-gray-950 shadow-sm" : "hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">{children}</div>
    </div>
  )
}
