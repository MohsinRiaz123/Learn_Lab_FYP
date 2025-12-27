export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Welcome back, Admin</h2>
          <p className="text-sm text-gray-600">Manage your platform efficiently</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full">🔔</button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}
