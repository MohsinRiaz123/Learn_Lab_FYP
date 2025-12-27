export function ProfileInfo() {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-indigo-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
            AB
          </div>
          <div>
            <h3 className="text-xl font-semibold">Ahmad Bilal</h3>
            <p className="text-gray-600">Industry Expert</p>
            <p className="text-sm text-gray-500">ahmad.bilal@learnlab.com</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-gray-900">+92 300 1234567</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <p className="text-gray-900">Lahore, Pakistan</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <p className="text-gray-900">Tech Solutions Ltd</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <p className="text-gray-900">3+ Years</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <p className="text-gray-900">
            Experienced software engineer and industry expert with over 3 years of experience in web development, React,
            and modern JavaScript frameworks.
          </p>
        </div>
      </div>
    </div>
  )
}
