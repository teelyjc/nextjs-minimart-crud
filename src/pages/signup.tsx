import { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import axios from "axios";

export default function Signup() {
  const router: NextRouter = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    isError: false,
    errorMessage: "",
  });

  const handleRegister = async () => {
    if (!data.username)
      return setData({
        ...data,
        isError: true,
        errorMessage: "กรุณากรอกชื่อผู้ใช้",
      });
    if (!data.password)
      return setData({
        ...data,
        isError: true,
        errorMessage: "กรุณากรอกรหัสผ่าน",
      });
    if (!data.confirm_password)
      return setData({
        ...data,
        isError: true,
        errorMessage: "กรุณายืนยันรหัสผ่าน",
      });
    if (data.password !== data.confirm_password)
      return setData({
        ...data,
        isError: true,
        errorMessage: "รหัสผ่านไม่ตรงกัน",
      });

    await axios.post("/api/auth/signup", {
      username: data.username,
      password: data.password,
    });

    setData({
      username: "",
      password: "",
      confirm_password: "",
      isError: false,
      errorMessage: "",
    });
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto border rounded-md py-12 px-28 space-y-2 shadow-xl">
        <div className="flex flex-col">
          <label>ชื่อผู้ใช้</label>
          <input
            type="text"
            className="border rounded-md"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            className="border rounded-md"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label>ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            className="border rounded-md"
            value={data.confirm_password}
            onChange={(e) =>
              setData({ ...data, confirm_password: e.target.value })
            }
          />
        </div>

        {data.isError ? (
          <p className="flex justify-center border rounded-md bg-red-500 py-1 text-white">
            {data.errorMessage}
          </p>
        ) : null}

        <div className="flex justify-center space-x-2">
          <button
            className="bg-green-500 text-white rounded-lg w-full px-2 py-1.5"
            onClick={handleRegister}
          >
            สมัคร
          </button>
          <button
            className="bg-red-500 text-white rounded-lg w-full px-2 py-1.5"
            onClick={() => router.push("/signin")}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
