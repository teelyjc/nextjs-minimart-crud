import { useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";

export default function SignInComponent() {
  const [ userData, setUserData ] = useState({
    username: "",
    password: "",
  });

  const [ error, setError ] = useState({
    isError: false,
    message: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleLogin = async () => {
    setError({ isError: false, message: "" });

    if (!userData.username)
      return setError({ isError: true, message: "กรุณากรอกชื่อผู้ใช้งาน" });
    if (!userData.password)
      return setError({ isError: true, message: "กรุณากรอกรหัสผ่าน" });

    setError({ isError: false, message: "" });

    // TODO: Authentication SignIn !
    console.log(userData);
    return;
  }

  return (
    <div className="flex flex-col border rounded-md space-y-2 mx-96 my-8 p-12 shadow-lg">
      <div className="flex flex-col">
        <label>ชื่อผู้ใช้งาน</label>
        <input type="text" name="username" className="border rounded-lg focus:outline-none px-1" onChange={ handleChange } required />
      </div>
      <div className="flex flex-col">
        <label>รหัสผ่าน</label>
        <input type="password" name="password" className="border rounded-lg focus:outline-none px-1" onChange={ handleChange } required />
      </div>
      {
        error.isError
        ? (
          <h1 className="text-center bg-red-500 text-white rounded-lg py-1">{ error.message }</h1>
        )
        : (null)
      }
      <div className="flex flex-col space-y-2">
        <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 w-full px-4 py-2 rounded-lg text-white" onClick={() => handleLogin()} >
          เข้าสู่ระบบ
        </button>
        <Link href="/authentication/signup">
          <div className="ml-auto">
            ไม่ได้เป็นสมาชิกใช่ไหม ? {" "}
            <a className="text-blue-500 hover:cursor-pointer">สมัครสมากชิก</a>
          </div>
        </Link>
      </div>
    </div>
  )
}