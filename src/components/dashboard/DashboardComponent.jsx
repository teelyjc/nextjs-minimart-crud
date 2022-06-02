export default function DashboardComponent({ user }) {
  return (
    <>
      <h1 className="text-2xl text-center capitalize">
        ยินดีต้อนรับ, { user.username }
      </h1>
    </>
  )
}
