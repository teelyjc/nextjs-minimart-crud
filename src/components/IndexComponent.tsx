import Link from "next/link";

export default function IndexComponent() {
  return (
    <div className="flex flex-col px-4 py-12 space-y-4">
      <h1 className="text-3xl text-center">ระบบสำหรับร้าน
        <br />
        NY-MINIMART
      </h1>
      <div className="mx-auto space-x-2 border rounded-lg shadow-lg px-12 py-8 lg:p-4 lg:py-8 lg:px-48">
        <Link href="/authentication/signin">
          <a className="text-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 rounded-xl">
            เข้าสู่ระบบ
          </a>
        </Link>
        <Link href="/authentication/signup">
          <a className="text-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-xl">
            สมัครสมาชิก
          </a>
        </Link>
      </div>
      <h1 className="text-center text-xs">
        Copyright © { new Date().getFullYear() } Tannatee Juchan. All rights reserved.
      </h1>
    </div>
  )
}