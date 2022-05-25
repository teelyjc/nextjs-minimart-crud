import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignUpComponent() {
  const [ allowSignup, setAllowSignup ] = useState(false);

  const [ userData, setUserData ] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
  });

  const [ error, setError ] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const getRegistrationState = async () => {
      const response = await axios.get('/api');
      setAllowSignup(response.data.services_status.allow_registration);
    }

    getRegistrationState();
  }, [allowSignup])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleRegister = async () => {
    setError({ isError: false, message: "" });
    
    if (!allowSignup)
      return setError({ isError: true, message: "ไม่มีการอณุญาติจากเซิฟเวอร์เพื่อสมัครสมาชิก" });

    if (!userData.username)
      return setError({ isError: true, message: "กรุณากรอกชื่อผู้ใช้งาน" });
    if (!userData.password)
      return setError({ isError: true, message: "กรุณากรอกรหัสผ่าน" });
    if (!userData.confirm_password)
      return setError({ isError: true, message: "กรุณายืนยันรหัสผ่าน" });
    if (!userData.email)
      return setError({ isError: true, message: "กรุณากรอกอีเมล์" });
    if (userData.password !== userData.confirm_password)
      return setError({ isError: true, message: "รหัสผ่านไม่ตรงกัน"})
    
    setError({ isError: false, message: "" });
    
    // TODO: Authentication SignUp !
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
      <div className="flex flex-col">
        <label>ยืนยันรหัสผ่าน</label>
        <input type="password" name="confirm_password" className="border rounded-lg focus:outline-none px-1" onChange={ handleChange } required />
      </div>
      <div className="flex flex-col">
        <label>อีเมล์</label>
        <input type="email" name="email" className="border rounded-lg focus:outline-none px-1" onChange={ handleChange } required />
      </div>
      {
        error.isError
        ? (
          <h1 className="text-center bg-red-500 text-white rounded-lg py-1">{ error.message }</h1>
        )
        : (null)
      }
      <div className="flex flex-col space-y-2">
        <button 
          className={
            (allowSignup 
            ? "bg-green-500 hover:bg-green-600 active:bg-green-700" 
            : "bg-gray-200").concat(" w-full px-4 py-2 rounded-lg text-white")
          }
          onClick={() => handleRegister()}
          disabled={ !allowSignup }
        >
          สมัครสมาชิก
        </button>
        <Link href="/authentication/signin">
          <div className="ml-auto">
            เป็นสมาชิกอยู่แล้วหรือเปล่า ? {" "}
            <a className="text-blue-500 hover:cursor-pointer">เข้าสู่ระบบ</a>
          </div>
        </Link>
      </div>
    </div>
  )
}