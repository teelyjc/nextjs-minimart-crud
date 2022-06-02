export default function IndexComponent() {
  return (
    <div className="flex flex-col border rounded-lg m-8 p-12 shadow-lg">
      <div className="flex flex-col">
        <div className="mx-auto">
          <h1 className="text-4xl lg:text-6xl">NY-Minimart</h1>
          <p className="text-sm lg:text-2xl">ระบบจัดการร้านค้าสำหรับ NY-Minimart</p>
        </div>
        <p className="text-sm lg:text-lg text-center mt-4">
          Copyright © { new Date().getFullYear() } Tannatee Juchan. All rights reserved.
        </p>
      </div>
    </div>
  )
}
