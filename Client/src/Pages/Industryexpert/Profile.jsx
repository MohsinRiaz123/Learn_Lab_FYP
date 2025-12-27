import { ProfileInfo } from "../../Components/profile-info"
import { ExpertiseAreas } from "../../Components/expertise-areas"
import { ProfileStats } from "../../Components/profile-stats"

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-gray-600">Manage your profile information and expertise areas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfileInfo />
        </div>
        <div className="space-y-6">
          <ProfileStats />
          <ExpertiseAreas />
        </div>
      </div>
    </div>
  )
}
