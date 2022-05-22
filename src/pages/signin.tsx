import { useState } from "react";

export default function Signin() {
  const [data, setData] = useState({ username: "", password: "" });

  return (
    <div className="flex h-screen">
      <div className="m-auto border rounded-md p-12 space-y-2 shadow-xl">
        <div className="flex flex-col">
          <label>ชื่อผู้ใช้</label>
          <input
            type="text"
            className="border rounded-md pl-2"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            className="border rounded-md pl-2"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="flex space-x-2 justify-center">
          <button className="bg-green-300 hover:bg-green-400 active:bg-green-500 text-white w-full py-1.5 rounded-md">
            เข้าสู่ระบบ
          </button>
          <button className="bg-blue-300 hover:bg-blue-400 active:bg-blue-500 text-white w-full py-1.5 rounded-md">
            สมัครสมาชิก
          </button>
        </div>
      </div>
    </div>
  );
}
